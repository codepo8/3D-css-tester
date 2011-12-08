var css, old = null,
    fm = dqs('form'),
    p = dqs('#perspective'), 
    pr = dqs('#preserve'),
    l = dqs('#logos'),
    code = dqs('#code'),

    c = dqs('#cube'),
    cx = dqs('#cx'), cy = dqs('#cy'), cz = dqs('#cz'),
    crx = dqs('#crx'), cry = dqs('#cry'), crz = dqs('#crz'),
    rx = dqs('#rotatex'), ry = dqs('#rotatey'), rz = dqs('#rotatez'),

    f = dqs('#front'), fbf = dqs('#fbf'),
    fl = dqs('#fl'), fx = dqs('#fx'), fy = dqs('#fy'), fz = dqs('#fz'),
    frx = dqs('#frx'), fry = dqs('#fry'), frz = dqs('#frz'),
    
    b = dqs('#back'), bbf = dqs('#bbf'),
    bl = dqs('#bl'), bx = dqs('#bx'), by = dqs('#by'), bz = dqs('#bz'),
    brx = dqs('#brx'), bry = dqs('#bry'), brz = dqs('#brz'),

    h = dqs('head');

fm.addEventListener('input', function(ev) {
  changevalues();
  ev.preventDefault();
}, false);

code.addEventListener('click', function(ev) {
  if (ev.target.id === 'create') {
    code.className = 'full';
    l.className = 'hidden';
    createfull();
    ev.preventDefault();
  }
}, false);

fm.addEventListener('click', function(ev) {
  if (ev.target.id === 'bl' || ev.target.id === 'fl') {
    var d = ev.target.parentNode.parentNode.querySelector('div');
    d.className = ev.target.checked ? '' : 'hide';
  }
}, false);

fm.addEventListener('change', function(ev) {
  changevalues();
  ev.preventDefault();
}, false);

fm.addEventListener('submit', function(ev) {
  changevalues();
  ev.preventDefault();
}, false);

var pfx = document.body.style['MozTransform'] !== undefined ? 'moz' : 'webkit';
// ^ Will update as needed :)

changevalues();

function createfull() {
  var tf = gettransforms();
  var fbfv = fbf.checked ? 'visible' : 'hidden';
  var bbfv = bbf.checked ? 'visible' : 'hidden';
  css = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8"><title>3D CSS example</title>\n<style>\n';
  css += ''+
  '#logos {\n'+
  '  position:absolute;'+
  '  top: 0px;'+
  '  left: 150px;'+
  '  -moz-perspective: ' + p.value + 'px;\n '+
  '  -ms-perspective: ' + p.value + 'px;\n '+
  '  -webkit-perspective: ' + p.value + 'px;\n '+
  '  -o-perspective: ' + p.value + 'px;\n '+
  '  perspective: ' + p.value + 'px; '+
  '\n}\n'+
  '#cube {\n'+
  '  display: block;'+
  '  position: relative;'+
  '  margin: 30px auto;\n'+
  '  height: 200px;'+
  '  width: 200px;\n'+
  '  -moz-transform-style: '+(pr.checked ? 'preserve-3d' : 'flat')+';\n'+
  '  -moz-transform:' + tf[0] + ';\n'+
  '  -webkit-transform-style: '+(pr.checked ? 'preserve-3d' : 'flat')+';\n'+
  '  -webkit-transform: ' + tf[0] + ';\n'+
  '  -ms-transform-style: '+(pr.checked ? 'preserve-3d' : 'flat')+';\n'+
  '  -ms-transform: ' + tf[0] + ';\n'+
  '  -o-transform-style: '+(pr.checked ? 'preserve-3d' : 'flat')+';\n'+
  '  -o-transform: ' + tf[0] + ';\n'+
  '  transform-style: '+(pr.checked ? 'preserve-3d' : 'flat')+';\n'+
  '  transform: ' + tf[0] + ';\n'+
  '\n}\n';
  if (fl.checked) {
    css += ''+
      '#front {\n'+
      '  position: absolute;'+
      '  height: 200px;'+
      '  width: 200px;\n'+
      '  -moz-backface-visibility: '+fbfv+';\n'+
      '  -moz-transform: '+ tf[1] +';\n'+
      '  -webkit-backface-visibility: '+fbfv+';\n'+
      '  -webkit-transform: '+ tf[1] +';\n'+
      '  -ms-backface-visibility: '+fbfv+';\n'+
      '  -ms-transform: '+ tf[1] +';\n'+
      '  -o-backface-visibility: '+fbfv+';\n'+
      '  -o-transform: '+ tf[1] +';\n'+
      '  backface-visibility: '+fbfv+';\n'+
      '  transform: '+ tf[1] +';'+
      '\n}\n';
  } else {
    css += '#front{display:none;}\n';
  }
  if (bl.checked) {
    css += ''+
    '#back {\n'+
    '  position: absolute;'+
    '  height: 200px;'+
    '  width: 200px;\n'+
    '  -moz-backface-visibility: '+bbfv+';\n'+
    '  -moz-transform: '+ tf[2] +';\n'+
    '  -ms-backface-visibility: '+bbfv+';\n'+
    '  -ms-transform: '+ tf[2] +';\n'+
    '  -webkit-backface-visibility: '+bbfv+';\n'+
    '  -webkit-transform: '+ tf[2] +';\n'+
    '  -o-backface-visibility: '+bbfv+';\n'+
    '  -o-transform:'+ tf[2] +';\n'+
    '  backface-visibility: '+bbfv+';\n'+
    '  transform:'+ tf[2] +';'+
    '\n}\n';
  } else {
    css += '#back{display:none}';
  }
  css += getanimations(true);
  css += '</style>\n</head>\n<body>\n<div id="logos">\n  <a id="cube" href="https://developer.mozilla.org/en/HTML/HTML5">\n    <img src="http://thewebrocks.com/demos/3D-css-tester/mdnface.png"  id="front" alt="MDN">\n    <img src="http://thewebrocks.com/demos/3D-css-tester/htmlface.png" id="back" alt="HTML5">\n  </a>\n</div>\n</body>\n</html>';
  code.innerHTML = '<p>Edit the form to go back</p><textarea>'+css+'</textarea>';
}

function gettransforms() {
  var cubetransform = '';
  if ( +crx.value !== 0 ) { cubetransform += ' rotateX('+crx.value+'deg)'; }
  if ( +cry.value !== 0 ) { cubetransform += ' rotateY('+cry.value+'deg)'; }
  if ( +crz.value !== 0 ) { cubetransform += ' rotateZ('+crz.value+'deg)'; }
  if ( +cx.value !== 0 ) { cubetransform += ' translateX('+cx.value+'px)'; }
  if ( +cy.value !== 0 ) { cubetransform += ' translateY('+cy.value+'px)'; }
  if ( +cz.value !== 0 ) { cubetransform += ' translateZ('+cz.value+'px)'; }
  cubetransform = cubetransform || 'rotateX(0) rotateY(0) rotateZ(0)';
  var fronttransform = '';
  if ( +frx.value !== 0 ) { fronttransform += ' rotateX('+frx.value+'deg)'; }
  if ( +fry.value !== 0 ) { fronttransform += ' rotateY('+fry.value+'deg)'; }
  if ( +frz.value !== 0 ) { fronttransform += ' rotateZ('+frz.value+'deg)'; }
  if ( +fx.value !== 0 ) { fronttransform += ' translateX('+fx.value+'px)'; }
  if ( +fy.value !== 0 ) { fronttransform += ' translateY('+fy.value+'px)'; }
  if ( +fz.value !== 0 ) { fronttransform += ' translateZ('+fz.value+'px)'; }
  var backtransform = '';
  if ( +brx.value !== 0 ) { backtransform += ' rotateX('+brx.value+'deg)'; }
  if ( +bry.value !== 0 ) { backtransform += ' rotateY('+bry.value+'deg)'; }
  if ( +brz.value !== 0 ) { backtransform += ' rotateZ('+brz.value+'deg)'; }
  if ( +bx.value !== 0 ) { backtransform += ' translateX('+bx.value+'px)'; }
  if ( +by.value !== 0 ) { backtransform += ' translateY('+by.value+'px)'; }
  if ( +bz.value !== 0 ) { backtransform += ' translateZ('+bz.value+'px)'; }
  return [ cubetransform, fronttransform, backtransform ];
}

function changevalues() {
  code.className = '';
  l.className = '';
  var tf = gettransforms();
  var fbfv = fbf.checked ? 'visible' : 'hidden';
  var bbfv = bbf.checked ? 'visible' : 'hidden';
  css = ''+
  '#logos {\n'+
  '  position:absolute;'+
  '  top: 0px;'+
  '  left: 150px;'+
  '  -' + pfx + '-perspective: ' + p.value + 'px; '+
  '\n}\n'+
  '#cube {\n'+
  '  display: block;'+
  '  position: relative;'+
  '  margin: 30px auto;\n'+
  '  height: 200px;'+
  '  width: 200px;\n'+
  '  -' + pfx + '-transform-style: ' + 
  (pr.checked ? 'preserve-3d' : 'flat') + ';\n'+
  '  -' + pfx + '-transform: '+tf[0]+';'+
  '\n}\n';
  if (fl.checked) {
    css += ''+
      '#front {\n'+
      '  position: absolute;'+
      '  height: 200px;'+
      '  width: 200px;\n'+
      '  -' + pfx + '-backface-visibility: ' + fbfv + ';\n'+
      '  -' + pfx + '-transform: ' + tf[1] + ';'+
      '\n}\n';
  } else {
    css += '#front{display:none;}\n';
  }
  if (bl.checked) {
    css += ''+
    '#back {\n'+
    '  position: absolute;'+
    '  height: 200px;'+
    '  width: 200px;\n'+
    '  -' + pfx + '-backface-visibility: ' + bbfv + ';\n'+
    '  -' + pfx + '-transform: ' + tf[2] + ';'+
    '\n}\n';
  } else {
    css += '#back{display:none}';
  }
  css += getanimations(false);
  if (old) {
    old.parentNode.removeChild(old);
  }
  var s = document.createElement('style');
  s.innerHTML = css;
  old = s;
  h.appendChild(s);
  code.innerHTML = '<button id="create">Create full page</button>'+
                   '<textarea>' + css + '</textarea>';
}

function getanimations(full) {
  var css = '', animname = 'upyourscache' + new Date().getTime();
    if ( rx.checked || ry.checked || rz.checked ) {
    var from = '', to = '';
    if( rx.checked ) { from += 'rotateX(0) '; }
    if( ry.checked ) { from += 'rotateY(0) '; }
    if( rz.checked ) { from += 'rotateZ(0) '; }
    if( rx.checked ) { to += 'rotateX(360deg) '; }
    if( ry.checked ) { to += 'rotateY(360deg) '; }
    if( rz.checked ) { to += 'rotateZ(360deg) '; }
    if(full){
      css += '#cube {\n'+
        '-moz-animation: ' + animname + ' 5s infinite linear;\n'+
        '-ms-animation: ' + animname + ' 5s infinite linear;\n'+
        '-webkit-animation: ' + animname + ' 5s infinite linear;\n'+
        '-o-animation: ' + animname + ' 5s infinite linear;\n'+
        'animation: ' + animname + ' 5s infinite linear;\n'+
      '\n}\n'+
      '@-moz-keyframes ' + animname + ' {\n'+
        '0% { -moz-transform: ' + from + ';}\n'+
        '100% { -moz-transform: ' + to + ';}\n'+
      '}\n'+
      '@-webkit-keyframes ' + animname + ' {\n'+
        '0% { -webkit-transform: ' + from + ';}\n'+
        '100% { -webkit-transform: ' + to + ';}\n'+
      '}\n'+
      '@-ms-keyframes ' + animname + ' {\n'+
        '0% { -ms-transform: ' + from + ';}\n'+
        '100% { -ms-transform: ' + to + ';}\n'+
      '}\n'+
      '@-o-keyframes ' + animname + ' {\n'+
        '0% { -o-transform: ' + from + ';}\n'+
        '100% { -o-transform: ' + to + ';}\n'+
      '}\n'+ 
      '@keyframes ' + animname + ' {\n'+
        '0% { transform: ' + from + ';}\n'+
        '100% { transform: ' + to + ';}\n'+
      '}\n';

    } else {
      css += '#cube {\n'+
        '-' + pfx + '-animation: ' + animname + ' 5s infinite linear;'+
      '\n}\n'+
      '@-' + pfx + '-keyframes ' + animname + ' {\n'+
        '0% { '+
        '-' + pfx + '-transform: ' + from + ';}\n'+
        '100% {'+
        '-' + pfx + '-transform: ' + to + '; }\n'+
      '}\n';
    }
  }
  return css;
}
function dqs(str) { 
  return document.querySelector(str);
}