// This script handles the initialization and interaction of the web application
function initXHR(x, value) {
	console.log("Initializing section: " + x);
		try {
		// Hide all sections first
		var sections = ["home", "journal", "emotions", "createJournal", "createEmotion", "dashboard", "affirmations"];
		for (var i = 0; i < sections.length; i++) {
			var section = document.getElementById(sections[i]);
			if (section) {
				section.style.display = "none";
			}
		}
		
		// Display the requested section
		if (x == 'dashboard') {
			var dashboardSection = document.getElementById("dashboard");
			if (dashboardSection) {
				dashboardSection.style.display = "block";
				
				// Check API availability
				checkApiAvailability();
				
				// Load dashboard content after making section visible
				setTimeout(function() {
					loadDashboard();
				}, 10);
			} else {
				console.error("Dashboard section not found");
				// Fallback to home
				var homeSection = document.getElementById("home");
				if (homeSection) homeSection.style.display = "block";
			}
		}
		else if (x == 'home') {
			var section = document.getElementById("home");
			if (section) section.style.display = "block";
		}
		else if (x == 'journal') {
			var section = document.getElementById("journal");
			if (section) {
				section.style.display = "block";
				retrieveJournalEntriesFromServer();
			}
		}
		else if (x == 'emotions') {
			var section = document.getElementById("emotions");
			if (section) {
				section.style.display = "block";
				retrieveEmotionEntriesFromServer();
			}
		}
		else if (x == 'createJournal') {
			var section = document.getElementById("createJournal");
			if (section) section.style.display = "block";
		}		else if (x == 'createEmotion') {
			var section = document.getElementById("createEmotion");
			if (section) section.style.display = "block";
		}
		else if (x == 'affirmations') {
			var section = document.getElementById("affirmations");
			if (section) {
				section.style.display = "block";
				loadAffirmations();
			}
		}
		else {
			// Default to dashboard
			var dashboardSection = document.getElementById("dashboard");
			if (dashboardSection) {
				dashboardSection.style.display = "block";
				loadDashboard();
			}
		}
	} catch (e) {
		console.error("Error in initXHR:", e);
		// Try to show something as fallback
		try {
			var fallbackSection = document.getElementById("home") || document.getElementById("dashboard");
			if (fallbackSection) {
				fallbackSection.style.display = "block";
			}
		} catch (innerErr) {
			console.error("Critical error in fallback handling:", innerErr);
		}
	}
}
/**
 * Retrieves journal entries from the server for a specific user
 * Queries the API and populates the journal entries list in the UI
 */
function retrieveJournalEntriesFromServer() {
	// TODO: In production, get userId from cookies or session storage
	var userId = 1; // Default user ID for development
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				try {
					var response = JSON.parse(xmlhttp.responseText);
					console.log('Journal entries response:', response); // Debug log
					
					if (response.success) {
						if (response.entries) {
							// Direct format from your API response
							populateJournalEntries('journalEntries', response.entries);
						} else if (response.data && response.data.entries) {
							// Nested entries format
							populateJournalEntries('journalEntries', response.data.entries);
						} else if (response.data) {
							// For backward compatibility
							populateJournalEntries('journalEntries', response.data);
						} else {
							document.getElementById('journalEntries').innerHTML = "<p>No journal entries found.</p>";
						}
					} else {
						document.getElementById('journalEntries').innerHTML = "<p>Error loading journal entries: " + (response.message || "Unknown error") + "</p>";
					}
				} catch (e) {
					console.error('Error parsing journal entries response:', e);
					document.getElementById('journalEntries').innerHTML = "<p>Error parsing response from server.</p>";
				}
			} else {
				console.error('HTTP error:', xmlhttp.status, xmlhttp.statusText);
				document.getElementById('journalEntries').innerHTML = "<p>Error loading journal entries. HTTP status: " + xmlhttp.status + "</p>";
			}
		}
	}
	xmlhttp.open("GET", '/app/journal/all/' + userId + '?limit=10&page=1', true);
	xmlhttp.send();
}

/**
 * Retrieves emotion entries for a specific user from the server
 * Queries the API and populates the emotion entries list in the UI
 */
function retrieveEmotionEntriesFromServer() {
	// TODO: In production, get userId from cookies or session storage
	var userId = 1; // Default user ID for development
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);
			if (response.success) {
				populateEmotionEntries('emotionEntries', response.data);
			} else {
				document.getElementById('emotionEntries').innerHTML = "<p>Error loading emotion entries.</p>";
			}
		}
	}
	xmlhttp.open("GET", '/app/emotion/monthly/' + userId, true);
	xmlhttp.send();
}

/**
 * Creates a new journal entry and sends it to the server
 * Collects data from form inputs and submits to the journal API
 */
function createJournalEntry() {
	var content = document.getElementById('journalContent').value;
	var feelings = document.getElementById('journalFeelings').value.split(',').map(item => item.trim());
	var people = document.getElementById('journalPeople').value.split(',').map(item => item.trim());
	var place = document.getElementById('journalPlace').value.split(',').map(item => item.trim());

	if (!content || !feelings.length || !people.length || !place.length) {
		alert('Please fill out all fields correctly.');
		return;
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 201) {				alert('Journal entry saved successfully!');
				document.getElementById('journalContent').value = '';
				document.getElementById('journalFeelings').value = '';
				document.getElementById('journalPeople').value = '';
				document.getElementById('journalPlace').value = '';
				// Go back to dashboard
				initXHR('dashboard', null);
			} else {
				alert('Error saving journal entry.');
				// Show more detailed error if available
				try {
					var response = JSON.parse(xmlhttp.responseText);
					if (response.message) {
						handleError("Error: " + response.message, null);
					}
				} catch (e) {
					console.error("Could not parse error response", e);
				}
		}
		}
	}
	
	xmlhttp.open("POST", '/app/journal/', true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.send(JSON.stringify({
		userId: 1,  // TODO: In production, get userId from cookies or session storage
		content: content,
		feelings: feelings,
		people: people,
		place: place,
		date: new Date()
	}));
}

/**
 * Creates a new emotion entry and sends it to the server
 * Collects feeling tags and mood score from the form and submits to the emotion API
 */
function createEmotionEntry() {
	var feelingsInput = document.getElementById('emotionFeelings').value;
	var moodScoreInput = document.getElementById('emotionMoodScore').value;
	var peopleInput = document.getElementById('emotionPeople') ? document.getElementById('emotionPeople').value : '';
	var placeInput = document.getElementById('emotionPlace') ? document.getElementById('emotionPlace').value : '';
	
	// Validate feelings input - remove empty items after splitting/trimming
	var feelings = feelingsInput.split(',')
		.map(item => item.trim())
		.filter(item => item.length > 0);
	
	// Process people and place inputs
	var people = peopleInput ? peopleInput.split(',')
		.map(item => item.trim())
		.filter(item => item.length > 0) : [];
	
	var place = placeInput ? placeInput.split(',')
		.map(item => item.trim())
		.filter(item => item.length > 0) : [];
	
	// Validate mood score is a number between 1-10
	var moodScore = parseInt(moodScoreInput);

	// Validate input before sending to server
	if (feelings.length === 0) {
		alert('Please enter at least one feeling tag.');
		return;
	}
	
	if (isNaN(moodScore) || moodScore < 1 || moodScore > 10) {
		alert('Please enter a mood score between 1 and 10.');
		return;
	}

	// Create the emotion entry data object
	var emotionData = {
		userId: 1,  // TODO: In production, get userId from cookies or session storage
		feelings: feelings,
		people: people,
		place: place,
		moodScore: moodScore,
		date: new Date()
	};
	
	console.log('Submitting emotion entry:', emotionData);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 201) {
				console.log('Emotion tracked successfully!');
				alert('Emotion tracked successfully!');
				
				// Clear the form inputs				document.getElementById('emotionFeelings').value = '';
				document.getElementById('emotionMoodScore').value = '';
				
				// Clear people and place inputs if they exist
				if (document.getElementById('emotionPeople')) {
					document.getElementById('emotionPeople').value = '';
				}
				if (document.getElementById('emotionPlace')) {
					document.getElementById('emotionPlace').value = '';
				}
				
				// Go back to dashboard to show updated graph
				initXHR('dashboard', null);
			} else {
				console.error('Error tracking emotion. Status:', xmlhttp.status);
				alert('Error tracking emotion.');
				
				// Show more detailed error if available
				try {
					var response = JSON.parse(xmlhttp.responseText);
					if (response.message) {
						console.error("Server error:", response.message);
						handleError("Error: " + response.message, null);
					}
				} catch (e) {
					console.error("Could not parse error response", e);
				}
			}
		}
	}
	xmlhttp.open("POST", '/app/emotion/', true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.send(JSON.stringify(emotionData));
}

/**
 * Populates the journal entries list in the UI
 * @param {string} elementId - The ID of the HTML element to populate
 * @param {Array} entries - Array of journal entries from the API
 */
function populateJournalEntries(elementId, entries) {
	var element = document.getElementById(elementId);
	var newElement = "";

	if (entries.length === 0) {
		newElement = "<p>No journal entries found. Create your first one!</p>";
	} else {
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];
			var date = new Date(entry.date).toLocaleDateString();
			
			newElement += "<div class=\"panel panel-default\">";
			newElement += "<div class=\"panel-heading\">";
			newElement += "<h4><a href=\"javascript:void(0)\" onclick=\"showJournalEntryModal('" + entry._id + "')\">" + date + "</a></h4>";
			newElement += "</div>";
			newElement += "<div class=\"panel-body\">";
			newElement += "<p>" + entry.content + "</p>";
			newElement += "</div>";
			newElement += "<table class=\"table\" style=\"font-size:10pt;\">";
			newElement += "<tbody>";
			newElement += "<tr>";
			newElement += "<td>Feelings: <span>" + entry.feelings.join(", ") + "</span></td>";
			newElement += "<td align=\"right\">";
			newElement += "<a href=\"#\"><span class=\"glyphicon glyphicon-edit\"></span></a> ";
			newElement += "<a href=\"#\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
			newElement += "</td>";
			newElement += "</tr>";
			newElement += "</tbody>";
			newElement += "</table>";
			newElement += "</div>";
		}
	}

	element.innerHTML = newElement;
}

/**
 * Populates the emotion entries list in the UI
 * @param {string} elementId - The ID of the HTML element to populate
 * @param {Array} entries - Array of emotion entries from the API
 */
function populateEmotionEntries(elementId, entries) {
	var element = document.getElementById(elementId);
	var newElement = "";

	if (!entries || entries.length === 0) {
		newElement = "<p>No emotion entries found. Start tracking your emotions!</p>";
	} else {
		newElement += "<div class=\"panel panel-default\">";
		newElement += "<table class=\"table\" style=\"font-size:10pt;\">";
		newElement += "<thead>";
		newElement += "<tr>";
		newElement += "<th>Date</th>";
		newElement += "<th>Feelings</th>";
		newElement += "<th>People</th>";
		newElement += "<th>Places</th>";
		newElement += "<th>Mood Score</th>";
		newElement += "</tr>";
		newElement += "</thead>";
		newElement += "<tbody>";
		
		// Make a copy of entries and sort them by date (most recent first)
		var sortedEntries = entries.slice().sort(function(a, b) {
			return new Date(b.date) - new Date(a.date);
		});
		
		for (var i = 0; i < sortedEntries.length; i++) {
			var entry = sortedEntries[i];
			
			// Make sure date is a valid date object
			var dateStr = "Unknown date";
			try {
				var date = new Date(entry.date);
				if (!isNaN(date.getTime())) {
					dateStr = date.toLocaleDateString();
				}
			} catch (e) {
				console.error("Error formatting date:", e);
			}
					// Format feelings array, handle edge cases
			var feelingsStr = Array.isArray(entry.feelings) ? 
				entry.feelings.join(", ") : 
				(entry.feelings || "");
				
			// Format people array, handle edge cases
			var peopleStr = Array.isArray(entry.people) ? 
				entry.people.join(", ") : 
				(entry.people || "");
				
			// Format place array, handle edge cases
			var placeStr = Array.isArray(entry.place) ? 
				entry.place.join(", ") : 
				(entry.place || "");
			
			newElement += "<tr>";
			newElement += "<td>" + dateStr + "</td>";
			newElement += "<td>" + feelingsStr + "</td>";
			newElement += "<td>" + peopleStr + "</td>";
			newElement += "<td>" + placeStr + "</td>";
			newElement += "<td>" + entry.moodScore + "/10</td>";
			newElement += "</tr>";
		}
		
		newElement += "</tbody>";
		newElement += "</table>";
		newElement += "</div>";
	}

	element.innerHTML = newElement;
}

/**
 * Loads and initializes all dashboard components
 * Retrieves user journal entries and emotion data for visualization
 */
function loadDashboard() {
	try {
		// Make sure the dashboard elements exist before proceeding
		if (!document.getElementById('moodGraph')) {
			console.error('moodGraph element not found');
			return;
		}
		
		if (!document.getElementById('recentActivity')) {
			console.error('recentActivity element not found');
			return;
		}
	
		// Show loading indicators
		document.getElementById('moodGraph').innerHTML = "<p class='text-center'><em>Loading mood graph...</em></p>";
		document.getElementById('recentActivity').innerHTML = "<p class='text-center'><em>Loading activity...</em></p>";
				// TODO: In production, get userId from cookies or session storage
		var userId = 1; // Default user ID for development
		
		// Try to load each component separately to prevent one failure from breaking everything
		try {
			retrieveRecentActivityForDashboard(userId);
		} catch (e) {
			console.error('Error loading recent activity:', e);
			document.getElementById('recentActivity').innerHTML = "<p>No recent activity available.</p>";
		}
		
		try {
			fetchEmotionDataForGraph(userId);
		} catch (e) {
			console.error('Error loading emotion graph:', e);
			document.getElementById('moodGraph').innerHTML = "<p>Unable to load mood graph.</p>";
		}
		
	// Affirmations functionality removed
	} catch (e) {
		console.error('Error in loadDashboard:', e);
	}
}

/**
 * Fetches recent journal activity for dashboard display
 * @param {string} userId - The user ID (currently hardcoded as 1)
 */
function retrieveRecentActivityForDashboard(userId) {
	try {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					try {
						var response = JSON.parse(xmlhttp.responseText);
						if (response.success && response.entries && response.entries.length > 0) {
							displayRecentActivity(response.entries.slice(0, 5)); // Show only most recent 5 entries
						} else {
							document.getElementById('recentActivity').innerHTML = "<p>No recent journal entries.</p>";
						}
					} catch (e) {
						console.error('Error parsing recent activity:', e);
						document.getElementById('recentActivity').innerHTML = "<p>No recent entries available. Start journaling!</p>";
					}
				} else {
					console.error('Error fetching recent activity, status:', xmlhttp.status);
					document.getElementById('recentActivity').innerHTML = "<p>No recent entries available. Start journaling!</p>";
				}
			}
		}
		xmlhttp.open("GET", '/app/journal/all/' + userId + '?limit=5&page=1', true);
		xmlhttp.send();
	} catch (e) {
		console.error('Error in retrieveRecentActivityForDashboard:', e);
		document.getElementById('recentActivity').innerHTML = "<p>No recent entries available. Start journaling!</p>";
	}
}

function displayRecentActivity(entries) {
	var element = document.getElementById('recentActivity');
	var newElement = "<ul class=\"list-group\">";
	
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		var date = new Date(entry.date).toLocaleDateString();
		var excerpt = entry.content.length > 50 ? entry.content.substring(0, 50) + '...' : entry.content;
		
		newElement += "<li class=\"list-group-item\">";
		newElement += "<strong>" + date + "</strong>: ";
		newElement += excerpt;
		newElement += "</li>";
	}
	
	newElement += "</ul>";
	
	// Add "View All" button below the list
	if (entries.length > 0) {
		newElement += "<div class=\"text-center\" style=\"margin-top: 10px;\">";
		newElement += "<a class=\"btn btn-primary btn-sm\" href=\"javascript:initXHR('journal', null)\" role=\"button\">View All Entries</a>";
		newElement += "</div>";
	}
	
	element.innerHTML = newElement;
}

/**
 * Fetches emotion data from the server for graphing
 * @param {string} userId - The user ID (currently hardcoded as 1)
 */
function fetchEmotionDataForGraph(userId) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				try {
					var response = JSON.parse(xmlhttp.responseText);
					console.log('Emotion data for graph received:', response);
					
					if (response.success && Array.isArray(response.data)) {
						// Ensure data is sorted by date
						var sortedData = response.data.sort(function(a, b) {
							return new Date(a.date) - new Date(b.date);
						});
						
						// Filter out entries with invalid mood scores
						var validData = sortedData.filter(function(entry) {
							return !isNaN(entry.moodScore) && entry.moodScore >= 1 && entry.moodScore <= 10;
						});
						
						console.log('Valid emotion entries for graph:', validData.length);
						drawMoodGraph(validData);
					} else {
						console.warn('No valid emotion data in response:', response);
						// Create sample data if no real data available
						drawMoodGraph([]);
					}
				} catch (e) {
					console.error('Error parsing emotion data:', e);
					// If error parsing, still show the graph with sample data
					drawMoodGraph([]);
				}
			} else {
				console.error('Error fetching emotion data, status:', xmlhttp.status);
				// If HTTP error, still show the graph with sample data
				drawMoodGraph([]);
			}
		}
	}
	xmlhttp.open("GET", '/app/emotion/monthly/' + userId, true);
	xmlhttp.send();
}

function drawMoodGraph(emotionData) {
	drawMoodGraphVisual(emotionData);
}

function drawMoodGraphVisual(emotionData) {
	try {
		console.log('Drawing mood graph with data:', emotionData);
		
		// Make sure emotionData is an array
		if (!Array.isArray(emotionData)) {
			console.error('emotionData is not an array:', emotionData);
			emotionData = [];
		}

		// Filter invalid entries
		emotionData = emotionData.filter(function(entry) {
			if (!entry || typeof entry !== 'object') {
				console.warn('Invalid entry in emotionData:', entry);
				return false;
			}
			
			if (!entry.date) {
				console.warn('Entry missing date:', entry);
				return false;
			}
			
			if (isNaN(entry.moodScore) || entry.moodScore < 1 || entry.moodScore > 10) {
				console.warn('Entry has invalid mood score:', entry);
				return false;
			}
			
			return true;
		});

		// Sort the emotion data by date
		emotionData.sort(function(a, b) {
			return new Date(a.date) - new Date(b.date);
		});
		
		var graphElement = document.getElementById('moodGraph');
		if (!graphElement) {
			console.error('moodGraph element not found');
			return;
		}
		
		var graphWidth = graphElement.offsetWidth - 60; // Allow for margins
		var graphHeight = 250;
		
		if (!graphWidth || graphWidth < 100) {
			graphWidth = 500; // Default if calculation fails
		}
		
		// Create a simple HTML/CSS graph using the Bootstrap styling
		var maxEntries = Math.min(emotionData.length, 14); // Show up to 14 days of data
		var recentData = emotionData.slice(-maxEntries);
		
		var html = "<div class=\"mood-graph\" style=\"height: 250px; position: relative; margin-bottom: 50px;\">";
		
		// Y-axis labels (1-10 scale)
		html += "<div style=\"position: absolute; left: 0; top: 0; width: 30px; height: 100%;\">";
		for (var i = 10; i >= 1; i--) {
			var labelTop = (10 - i) * 25; // 25px per unit on a 250px height
			html += "<div style=\"position: absolute; top: " + labelTop + "px; right: 5px;\">" + i + "</div>";
		}
		html += "</div>";
		
		// Graph area with grid lines
		html += "<div style=\"position: absolute; left: 30px; top: 0; width: " + (graphWidth) + "px; height: 100%; border-left: 1px solid #ddd; border-bottom: 1px solid #ddd;\">";
		
		// Grid lines
		for (var i = 1; i < 10; i++) {
			var lineTop = i * 25;
			html += "<div style=\"position: absolute; top: " + lineTop + "px; left: 0; right: 0; border-top: 1px dashed #eee;\"></div>";
		}
		// Plot points and line
	var pointGap = recentData.length > 1 ? Math.floor((graphWidth - 20) / (recentData.length - 1)) : graphWidth - 20;
	
	// First, draw connecting lines if we have more than one data point
	if (recentData.length > 1) {
		html += "<svg style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;\">";
		html += "<polyline points=\"";
		
		for (var i = 0; i < recentData.length; i++) {
			var score = recentData[i].moodScore || 5; // Default to 5 if missing
			var x = i * pointGap + 10;
			var y = 270 - (score * 25); // 25px per unit on 250px height
			html += x + "," + y + " ";
		}
		
		html += "\" style=\"fill: none; stroke: #337ab7; stroke-width: 2;\"/>";
		html += "</svg>";
	}
	
	// Then, draw the points
	for (var i = 0; i < recentData.length; i++) {
		try {
			var score = recentData[i].moodScore || 5; // Default to 5 if missing
			var x = i * pointGap;
			var dateObj = new Date(recentData[i].date);
			var date = dateObj.toLocaleDateString();
			
			// Add a tooltip with mood score and feelings
			var tooltip = "Date: " + date + "<br>Score: " + score + "/10";
			if (recentData[i].feelings && Array.isArray(recentData[i].feelings) && recentData[i].feelings.length > 0) {
				tooltip += "<br>Feelings: " + recentData[i].feelings.join(", ");
			}
			
			// Data point with tooltip
			html += "<div style=\"position: absolute; bottom: " + ((score - 1) * 25) + "px; left: " + (x + 5) + "px; z-index: 2;\" title=\"" + tooltip + "\">";
			html += "<div class=\"data-point\" style=\"width: 12px; height: 12px; background-color: #337ab7; border-radius: 50%; cursor: pointer;\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"top\" title=\"" + tooltip + "\"></div>";
			html += "</div>";
			
			// X-axis label (date)
			html += "<div style=\"position: absolute; top: 100%; left: " + x + "px; transform: rotate(45deg); transform-origin: left top; font-size: 10px; width: 70px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 5px;\">";
			html += date;
			html += "</div>";
		} catch (err) {
			console.error('Error rendering data point:', err);
			// Continue with next point
		}
	}
	
	html += "</div>";
	html += "</div>";
	
	// Legend
	html += "<div style=\"margin-top: 50px; text-align: center; font-size: 12px;\">";
	html += "<strong>Mood Score (1-10)</strong> over time";
	html += "</div>";
	
	try {
		graphElement.innerHTML = html;
		
		// Initialize tooltips
		if (typeof $ !== 'undefined' && typeof $().tooltip === 'function') {
			setTimeout(function() {
				try {
					$('[data-toggle="tooltip"]').tooltip();
				} catch (e) {
					console.error('Error initializing tooltips:', e);
				}
			}, 100);
		}
	} catch (e) {
		console.error('Error updating graph element:', e);
	}
	} catch (e) {
		console.error('Error in drawMoodGraphVisual:', e);
		// Try to display a simple fallback
		try {
			var graphElement = document.getElementById('moodGraph');
			if (graphElement) {
				graphElement.innerHTML = "<div class='alert alert-warning'>Unable to display graph. Please try again later.</div>";
			}
		} catch (innerErr) {
			console.error('Error displaying fallback graph message:', innerErr);
		}
	}
}

/**
 * Empty placeholder function for adding affirmations
 * This functionality has been removed
 */
function addAffirmation() {
	// Functionality removed
	alert('Affirmations feature is not implemented yet.');
}

/**
 * Simple placeholder function for loading affirmations
 * Shows an empty list since this functionality has been removed
 */
function loadAffirmations() {
	// Find the affirmations list element if it exists
	var affirmationsList = document.getElementById('affirmationsList');
	if (affirmationsList) {
		// Show empty list with informational message
		affirmationsList.innerHTML = '<div class="alert alert-info">No affirmations available. This feature is not implemented yet.</div>';
	}
}

// Error handling helper function
function handleError(message, error) {
	console.error(message, error);
	
	// Show error message to user if it's something they should know about
	var errorDisplay = document.getElementById('errorMessages');
	if (errorDisplay) {
		errorDisplay.textContent = message;
		errorDisplay.style.display = 'block';
		
		// Auto-hide after 5 seconds
		setTimeout(function() {
			errorDisplay.style.display = 'none';
		}, 5000);
	}
}

/**
 * Simple check function to verify if the API endpoints are accessible.
 * This helps ensure the backend is running before trying to use the application.
 */
function checkApiAvailability() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status !== 200) {
				handleError("Warning: API server might be unavailable. Some features may not work correctly.", null);
			}
		}
	};
		// TODO: In production, get userId from cookies or session storage
	var userId = 1; // Default user ID for development
	// Try to fetch emotions API - just to check if server is responding
	xhr.open('GET', '/app/emotion/monthly/' + userId, true);
	xhr.send();
}

/**
 * Shows a modal with full journal entry details
 * Uses the GET /app/journal/:id/:userId API endpoint to fetch entry details
 * @param {string} entryId - The ID of the journal entry to display
 */
function showJournalEntryModal(entryId) {
	var userId = 1; // TODO: In production, get userId from cookies or session storage
	var xmlhttp = new XMLHttpRequest();
	
	// Show loading indicator in the modal
	document.getElementById('journalEntryModalBody').innerHTML = 
		"<div class='text-center'><p><em>Loading entry details...</em></p></div>";
	$('#journalEntryModal').modal('show');
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var response = JSON.parse(xmlhttp.responseText);
				if (response.success && response.data) {
					var entry = response.data;
					
					// Format the date nicely
					var entryDate = new Date(entry.date).toLocaleString();
					
					// Create modal content
					var html = "<h4>" + entryDate + "</h4>";
					
					// Show feelings tags
					html += "<p><strong>Feelings:</strong> " + 
					   (entry.feelings && entry.feelings.length ? entry.feelings.join(", ") : "None specified") + 
					   "</p>";
					
					// Show people if available
					if (entry.people && entry.people.length) {
						html += "<p><strong>People:</strong> " + entry.people.join(", ") + "</p>";
					}
					
					// Show places if available
					if (entry.place && entry.place.length) {
						html += "<p><strong>Places:</strong> " + entry.place.join(", ") + "</p>";
					}
					
					// Show full content with proper formatting
					html += "<hr><div class='well'>" + entry.content + "</div>";
					
					// Update modal title and content
					document.getElementById('journalEntryModalLabel').innerText = "Journal Entry - " + entryDate;
					document.getElementById('journalEntryModalBody').innerHTML = html;
				} else {
					document.getElementById('journalEntryModalBody').innerHTML = 
						"<div class='alert alert-warning'>Entry not found or could not be loaded.</div>";
				}
			} else {
				document.getElementById('journalEntryModalBody').innerHTML = 
					"<div class='alert alert-danger'>Error loading entry. Please try again later.</div>";
			}
		}
	};
	
	// Make the API request to get full journal entry details
	xmlhttp.open("GET", "/app/journal/" + entryId + "/" + userId, true);
	xmlhttp.send();
}
