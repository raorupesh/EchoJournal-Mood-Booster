function initXHR(x, value) {
	console.log(x); 
	// Hide all sections first
	document.getElementById("home").style.display = "none";
	document.getElementById("journal").style.display = "none";
	document.getElementById("emotions").style.display = "none";
	document.getElementById("createJournal").style.display = "none";
	document.getElementById("createEmotion").style.display = "none";
	
	if (x == 'home') {
		document.getElementById("home").style.display = "block";
	}
	else if (x == 'journal') {
		retrieveJournalEntriesFromServer();
		document.getElementById("journal").style.display = "block";
	}
	else if (x == 'emotions') {
		retrieveEmotionEntriesFromServer();
		document.getElementById("emotions").style.display = "block";
	}
	else if (x == 'createJournal') {
		document.getElementById("createJournal").style.display = "block";
	}
	else if (x == 'createEmotion') {
		document.getElementById("createEmotion").style.display = "block";
	}
	else {
		document.getElementById("home").style.display = "block";
	}
}

function retrieveActiveListsFromServer(url, operation) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var returnValues = JSON.parse(xmlhttp.responseText);
			if (operation == "lists") {
				populateListsView('lists', returnValues);
			}
			else if (operation == "gList") {
				populateListItems('tasks', returnValues);				
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//DOM based function
function populateListsView(elementId, lists) {
	var element = document.getElementById(elementId);
	var newElement = "<h3 class=\"panel-heading\">Active Lists</h3>";

	for (var i = 0; i < lists.length; i++) {
		newElement += "<div class=\"panel panel-default\">";
		newElement += "<h4 class=\"panel-heading\"><a href=\"javascript:initXHR('gList'," +  (i+1) + ")\">" + (i + 1) + ". " + lists[i].name + "</a></h4>";
		newElement += "<div class=\"panel-body\">";
		newElement += "<p>" + lists[i].description  + "</p>";
		newElement += "</div>";
		newElement += "<table class=\"table\" style=\"font-size:10pt;\">";
		newElement += "<tbody>";
		newElement += "<tr>";
		newElement += "<td>Due: <span>" + lists[i].due + "</span></td>";
		newElement += "<td align=\"right\">Items: <span class=\"badge\">" + lists[i].items + "</span></td>";
		newElement += "</tr>";
		newElement += "</tbody>";
		newElement += "</table>";
		newElement += "</div>";
	}

	element.innerHTML = newElement;
}

//DOM based function
function populateListItems2(elementId, list) {
	var listItems = list.tasks;
	var element = document.getElementById(elementId);
	var newElement = "";

	for (var i = 0; i < listItems.length; i++) {
		newElement += "<tr>";
		newElement += "<td>" + listItems[i].description + "</td>";
		newElement += "<td><span class=\"badge\">" + listItems[i].shared + "</span></td>";
		newElement += "<td>";
		newElement += "<div class=\"input-group\">";
		newElement += "<span class=\"input-group-addon\" style=\"border-style:none;\">";
		newElement += "<input type=\"checkbox\">";
		newElement += "</span>";
		newElement += "</div>";
		newElement += "</td>";
		newElement += "</tr>";
	}

	element.innerHTML = newElement;	
}

//JQuery based function
function populateListItems(elementId, list) {
	var listItems = list.tasks;
	var newElement = "";

	for (var i = 0; i < listItems.length; i++) {
		newElement += "<tr>";
		newElement += "<td>" + listItems[i].description + "</td>";
		newElement += "<td><span class=\"badge\">" + listItems[i].shared + "</span></td>";
		newElement += "<td>";
		newElement += "<div class=\"input-group\">";
		newElement += "<span class=\"input-group-addon\" style=\"border-style:none;\">";
		newElement += "<input type=\"checkbox\">";
		newElement += "</span>";
		newElement += "</div>";
		newElement += "</td>";
		newElement += "</tr>";
	}
	$("#" + elementId).append(newElement);
}

function retrieveJournalEntriesFromServer() {
	var userId = 'user123'; // Default user ID (would be replaced with actual user authentication)
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);
			if (response.success) {
				populateJournalEntries('journalEntries', response.data);
			} else {
				document.getElementById('journalEntries').innerHTML = "<p>Error loading journal entries.</p>";
			}
		}
	}
	xmlhttp.open("GET", '/app/journal/all/' + userId + '?limit=10&page=1', true);
	xmlhttp.send();
}

function retrieveEmotionEntriesFromServer() {
	var userId = 'user123'; // Default user ID (would be replaced with actual user authentication)
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

function createJournalEntry() {
	var content = document.getElementById('journalContent').value;
	var feelings = document.getElementById('journalFeelings').value.split(',').map(item => item.trim());
	var moodScore = parseInt(document.getElementById('journalMoodScore').value);

	if (!content || !feelings.length || isNaN(moodScore) || moodScore < 1 || moodScore > 10) {
		alert('Please fill out all fields correctly.');
		return;
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 201) {
				alert('Journal entry saved successfully!');
				document.getElementById('journalContent').value = '';
				document.getElementById('journalFeelings').value = '';
				document.getElementById('journalMoodScore').value = '';
				initXHR('journal', null);
			} else {
				alert('Error saving journal entry.');
			}
		}
	}
	xmlhttp.open("POST", '/app/journal/', true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.send(JSON.stringify({
		userId: 'user123',  // Default user ID
		content: content,
		feelings: feelings,
		moodScore: moodScore,
		date: new Date()
	}));
}

function createEmotionEntry() {
	var feelings = document.getElementById('emotionFeelings').value.split(',').map(item => item.trim());
	var moodScore = parseInt(document.getElementById('emotionMoodScore').value);

	if (!feelings.length || isNaN(moodScore) || moodScore < 1 || moodScore > 10) {
		alert('Please fill out all fields correctly.');
		return;
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 201) {
				alert('Emotion tracked successfully!');
				document.getElementById('emotionFeelings').value = '';
				document.getElementById('emotionMoodScore').value = '';
				initXHR('emotions', null);
			} else {
				alert('Error tracking emotion.');
			}
		}
	}
	xmlhttp.open("POST", '/app/emotion/', true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.send(JSON.stringify({
		userId: 'user123',  // Default user ID
		feelings: feelings,
		moodScore: moodScore,
		date: new Date()
	}));
}

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
			newElement += "<h4>" + date + " <span class=\"badge\">" + entry.moodScore + "/10</span></h4>";
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
		newElement += "<th>Mood Score</th>";
		newElement += "</tr>";
		newElement += "</thead>";
		newElement += "<tbody>";
		
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];
			var date = new Date(entry.date).toLocaleDateString();
			
			newElement += "<tr>";
			newElement += "<td>" + date + "</td>";
			newElement += "<td>" + entry.feelings.join(", ") + "</td>";
			newElement += "<td>" + entry.moodScore + "/10</td>";
			newElement += "</tr>";
		}
		
		newElement += "</tbody>";
		newElement += "</table>";
		newElement += "</div>";
	}

	element.innerHTML = newElement;
}
