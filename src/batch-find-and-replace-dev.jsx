
/*************************************************
*
* This script batch processes InDesign FNR
*
****************************************************
* Copyright (c)  2013
* Fabian "fabiantheblind" Morón Zirfas
* Permission is hereby granted, free of charge, to any 
* person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software
* without restriction, including without limitation the rights 
* to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to  permit persons to 
* whom the Software is furnished to do so, subject to
* the following conditions:
* The above copyright notice and this permission notice
* shall be included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* see also http://www.opensource.org/licenses/mit-license.php
*
* Btw: It's awesome that you are reading the source code
* feel free to ask me anything about it
*
****************************************************
* there are some js libraries used
* ----------------------------------------------
* a toml (Tom's Obvious, Minimal Language) parser https://github.com/mojombo/toml 
* by JonAbrams https://github.com/JonAbrams/tomljs
* ----------------------------------------------
* ----------------------------------------------
* JsonDiffPatch by benjamine to get the toml into
* our structure
* Diff & Patch for JavaScript objects and arrays
* (ie. any JSON serializable structure)
* https://github.com/benjamine/JsonDiffPatch
**************************************************/

bfnr_run();
/**
 * [bfnr_run description]
 * @return {[type]} [description]
 */
function bfnr_run(){
var path = ((File($.fileName)).path);

$.evalFile(File(path + '/submodules/tomljs/toml.js'));// https://github.com/JonAbrams/tomljs

$.evalFile(File(path +'/submodules/JsonDiffPatch/src/jsondiffpatch.js')); // https://github.

/**
 * the settings
 * @type {Object}
 */
var bfnr = {
  'version':'0.1.1',
  'toml':null,
  'settings':{
  'do_text':false,
  'do_grep':false,
  'do_glyph':false,
  'do_object':false,
  'do_all_docs':true
  }
};
// lets get the data
var tomltxt = readfile('toml', path);
if(tomltxt !==null){
  // diff and patch the settings
  // 
  bfnr.toml = TOML.parse(tomltxt);
  var delta = jsondiffpatch.diff(bfnr.settings, bfnr.toml);
  // alert(delta.toSource());
  jsondiffpatch.patch(bfnr.settings, delta);
  // alert(bfnr.settings.toSource());
}

// this is written for mirna to work on all of her docs ;)
// http://forums.adobe.com/message/5228290#5228290
var doc = null;
if(bfnr.settings.do_all_docs === true){
  for(var i = 0; i < app.documents.length;i++){
    doc = app.documents[i];
    if(doc !== null){
    run_processor(doc, bfnr);
    }
  }

}else{
  doc = app.activeDocument;
  if(doc !== null){
    run_processor(doc, bfnr);
  }
}

} // end of run function
/**
 * [run_processor description]
 * @param  {[type]} doc  [description]
 * @param  {[type]} bfnr [description]
 * @return {[type]}      [description]
 */
function run_processor(doc, bfnr){
if(bfnr.settings.do_text === true){
  processor(doc, SearchModes.TEXT_SEARCH, bfnr.toml.text.files);
}
if(bfnr.settings.do_grep === true){
  processor(doc, SearchModes.GREP_SEARCH, bfnr.toml.grep.files);
}
if(bfnr.settings.do_glyph === true){
  processor(doc, SearchModes.GLYPH_SEARCH, bfnr.toml.glyph.files);
}
if(bfnr.settings.do_object === true){
  processor(doc, SearchModes.OBJECT_SEARCH, bfnr.toml.objects.files);
}
}
/**
 * [processor description]
 * @param  {[type]} doc  [description]
 * @param  {[type]} mode [description]
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
function processor(doc, mode, list){
for(var i = 0; i < list.length;i++){
  try{
  app.loadFindChangeQuery (list[i], mode);
  if(mode == SearchModes.TEXT_SEARCH){
    doc.changeText();
    }
  if(mode == SearchModes.GREP_SEARCH){
    doc.changeGrep();
    }
  if(mode == SearchModes.OBJECT_SEARCH){
    doc.changeObject();
    }
  if(mode == SearchModes.GLYPH_SEARCH){
    doc.changeGlyph();
    }
  }catch(e){
    alert('There was an error while trying to process the "' + list[i]+'.xml"\n'+
      'Please make shure it exists and is at the right spot\n'+
      e);
    }
  }
}
/**
 * basic file reading function
 * @param  {String} type the type of file
 * @return {String or null}
 */
function readfile(type, path){
  var file_to_read = null;
  file_to_read = File(path + '/' + 'batch-find-and-replace.toml');
  if(file_to_read.exists !== true){
    file_to_read = File.openDialog("Select a "+type+" file to import.", "*."+type,false);
  }

  var txt = null;
  if (file_to_read !== null) {
    file_to_read.open('r','TEXT','????');
    txt = file_to_read.read();
    file_to_read.close();
  }
  if(txt !== null){
    return txt;
  }else{
    alert('Error reading file');
    return null;
  }
}