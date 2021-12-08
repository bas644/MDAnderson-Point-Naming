
//import {protsArray} from './protocols.js';

document.getElementById('sysIdLbl').style.display = 'none';
document.getElementById('sysId').style.display = 'none';
document.getElementById('equipLbl').style.display = 'none';
document.getElementById('equip').style.display = 'none';

let dynamicPoint = ['Bld', 'Flr', ' ', 'Rm', ' ', 'Sys', '', ' ', 'EqupPoints']

// Set "Protocol" drop down menu items
const loadProt = async function() {
	try {
		let protsProms = await fetch("./TextFiles/protocols.json")
		let protArray = await protsProms.json();
		let protInfo = document.getElementById('prot');
		for(index in protArray) {
			protInfo.options[protInfo.options.length] = new Option(protArray[index], index);
		}
	}
	catch(e) {console.log('loadProt did not work');}
}

// Set "Building" drop down menu items
const loadBuild = async function() {
	try {
		let buildsProms = await fetch("./TextFiles/buildings.json")
		let buildArray = await buildsProms.json();
		let buildInfo = document.getElementById('build');
		for(index in buildArray) {
			buildInfo.options[buildInfo.options.length] = new Option(buildArray[index], index);
		}
	}
	catch(e) {console.log('loadBuild did not work');}
}

// Set "Floor" drop down menu items
const loadFloor = async function() {
	try {
		let floorsProms = await fetch("./TextFiles/floors.json")
		let floorArray = await floorsProms.json();
		let floorInfo = document.getElementById('flr');
		for(index in floorArray) {
			floorInfo.options[floorInfo.options.length] = new Option(floorArray[index], index);
		}
	}
	catch(e) {console.log('loadFloor did not work');}
}

// Set "System" drop down menu items
const loadSys = async function() {
	try {
		let sysProms = await fetch("./TextFiles/systems.json")
		let sysArray = await sysProms.json();
		let sysInfo = document.getElementById('sys');
		for(index in sysArray) {
			sysInfo.options[sysInfo.options.length] = new Option(sysArray[index], index);
		}
	}
	catch(e) {console.log('loadSys did not work');}
}

loadProt();
loadBuild();
loadFloor();
loadSys();

// Display initial POINT value "BldFlr Rm Sys EqupPoints"
function newPointUpdate() {
	let newPoint = ''
	for(item in dynamicPoint) {		
		newPoint = newPoint + dynamicPoint[item];
	}
	document.getElementById("pnt").innerHTML = newPoint;
}
newPointUpdate()

// Update POINT value to new selection
function update(ID) {
	// Get the value of the protocol selected;
	let sel = document.getElementById(ID);
	let Opt = sel.options[sel.selectedIndex].value;
	return Opt
}

// Update the PROTOCOL delimeter
function protUpdate(){
	dynamicPoint[2] = update('prot');
	dynamicPoint[4] = dynamicPoint[2];
	dynamicPoint[7] = dynamicPoint[2];
	newPointUpdate();
}

// Update the BUILDING tag
function buildUpdate(){
	dynamicPoint[0] = update('build');
	newPointUpdate();
}

// Update the FLOOR number
function flrUpdate(){
	dynamicPoint[1] = update('flr');
	newPointUpdate();
}

// Update the ROOM number on PRESS ENTER
function rmKey(evnt){
	if(event.key === 'Enter'){
		rmUpdate();
	}
}

// Update the ROOM number on mouse moves
function rmUpdate(){
	let roomOption = document.getElementById('rm').value;
	dynamicPoint[3] = roomOption;
	newPointUpdate();
}

// Update AH number on PRESS ENTER
function sysKey(evnt){
	if(event.key === 'Enter'){
		sysIdUpdate();
	}
}

// Update AH number on mouse moves
function sysIdUpdate(){
	let sysIdOption = document.getElementById('sysId').value;
	dynamicPoint[6] = sysIdOption;
	newPointUpdate();
}

// Update the System Equipment
function sysEqUpdate(){
	dynamicPoint[8] = update('equip');
	newPointUpdate();
}

// Set "Equipment" drop down menu items
const loadSysEq = async function(file) {
	try {
		document.getElementById('equipLbl').style.display = 'block';
		document.getElementById('equip').style.display = 'block';
		let sysEqProms = await fetch(file)
		let equipArray = await sysEqProms.json();
		let equipInfo = document.getElementById('equip');
		equipInfo.options.length = 0;
		for(index in equipArray) {
			equipInfo.options[equipInfo.options.length] = new Option(equipArray[index], index);
		}		
	}
	catch(e) {console.log('loadSysEq did not work');}
}
function sysUpdate(){
	dynamicPoint[5] = update('sys');
		//Building System == 'AHU'
	if (dynamicPoint[5] == 'AHU') {
		document.getElementById('sysIdLbl').style.display = 'block';
		document.getElementById('sysId').style.display = 'block';
		loadSysEq('./TextFiles/AHUequipment.json')
	} else {
		dynamicPoint[6] = '';
		document.getElementById('sysIdLbl').style.display = 'none';
		document.getElementById('sysId').style.display = 'none';
	}
		//Building System == 'CHW'
	if (dynamicPoint[5] == 'CHW') {
		loadSysEq('./TextFiles/CHWequipment.json')
	}
		//Building System == 'CW'
	if (dynamicPoint[5] == 'CW') {
		loadSysEq('./TextFiles/CWequipment.json')
	}
		//Building System == 'HW'
	if (dynamicPoint[5] == 'HW') {
		loadSysEq('./TextFiles/HWequipment.json')
	}	
}
