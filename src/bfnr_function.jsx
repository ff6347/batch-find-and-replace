/**
 * [bfnr_run description]
 * @return {[type]} [description]
 */

function bfnr_run() {
  var path = ((File($.fileName)).path);

  $.evalFile(File(path + '/submodules/tomljs/toml.js')); // https://github.com/JonAbrams/tomljs

  $.evalFile(File(path + '/submodules/JsonDiffPatch/src/jsondiffpatch.js')); // https://github.

  /**
   * the settings
   * @type {Object}
   */
  var bfnr = {
    'version': '0.1.3',
    'toml': null,
    'settings': {
      'do_text': false,
      'do_grep': false,
      'do_glyph': false,
      'do_object': false,
      'do_all_docs': true
    }
  };
  // lets get the data
  var tomltxt = readfile('toml', path);
  if (tomltxt !== null) {
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
  if (bfnr.settings.do_all_docs === true) {
    for (var d = 0; d < app.documents.length; d++) {
      doc = app.documents[d];
      if (doc !== null) {
        run_processor(doc, bfnr);
      }
    }

  } else {
    doc = app.activeDocument;
    if (doc !== null) {
      // if(doc.selection.length === 0){
      //   bfnr.settings.selection_mode = false;
      // }
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

function run_processor(doc, bfnr) {
  if (bfnr.settings.do_text === true) {
    processor(doc, SearchModes.TEXT_SEARCH, bfnr.toml.text.files, "Text Search",
      bfnr);
  }
  if (bfnr.settings.do_grep === true) {
    processor(doc, SearchModes.GREP_SEARCH, bfnr.toml.grep.files, "Grep Search",
      bfnr);
  }
  if (bfnr.settings.do_glyph === true) {
    processor(doc, SearchModes.GLYPH_SEARCH, bfnr.toml.glyph.files,
      "Glyph Search", bfnr);
  }
  if (bfnr.settings.do_object === true) {
    processor(doc, SearchModes.OBJECT_SEARCH, bfnr.toml.objects.files,
      "Object Search", bfnr);
  }
}
/**
 * [processor descriptio, bfnrn]
 * @param  {[type]} doc  [description]
 * @param  {[type]} mode [description]
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */

function processor(doc, mode, list, title, bfnr) {

  var progress_win = new Window("palette");

  var progress = progress_bar(progress_win, list.length,
    'processing FC Queries' + title);


  for (var i = 0; i < list.length; i++) {

    empty_fc_fields(mode);
    try {
      app.loadFindChangeQuery(list[i], mode);
    } catch (e) {
      alert('There was an error while trying to process the "' + list[i] +
        '.xml"\n' +
        'Please make sure it exists and is at the right spot\n' +
        e);
    }
    try {
      if (mode == SearchModes.TEXT_SEARCH) {
        if (doc.selection.length > 0) {
          for (var j = 0; j < doc.selection.length; j++) {
            if(!(doc.selection[j].hasOwnProperty('changeText'))){
              continue;
            }
            var sel_item_text = doc.selection[j];
            sel_item_text.changeText();
          }
        } else {
          doc.changeText();
        }
      }
    } catch (e) {
      alert('There was an error while processing the changeText command\n' + e);
    }
    try {

      if (mode == SearchModes.GREP_SEARCH) {


        if (doc.selection.length > 0) {
          for (var k = 0; k < doc.selection.length; k++) {
            if(!(doc.selection[k].hasOwnProperty('changeGrep'))){
              continue;
            }
            var sel_item_grep = doc.selection[k];
            sel_item_grep.changeGrep();

          }
        } else {
          doc.changeGrep();
        }
      }
    } catch (e) {
      alert('There was an error while processing the changeGrep command\n' + e);
    }
    try {

      if (mode == SearchModes.OBJECT_SEARCH) {


        if (doc.selection.length > 0) {
          for (var l = 0; l < doc.selection.length; l++) {
            if(!(doc.selection[l].hasOwnProperty('changeObject'))){
              continue;
            }
            var sel_item_obj = doc.selection[l];

            sel_item_obj.changeObject();
          }
        } else {
          doc.changeObject();
        }

      }
    } catch (e) {
      alert('There was an error while processing the changeObject command\n' +
        e);
    }
    try {

      if (mode == SearchModes.GLYPH_SEARCH) {


        if (doc.selection.length > 0) {
          for (var m = 0; m < doc.selection.length; m++) {
            if(!(doc.selection[m].hasOwnProperty('changeGlyph'))){
              continue;
            }
            var sel_item_glyph = doc.selection[m];

            sel_item_glyph.changeGlyph();
          }
        } else {
          doc.changeGlyph();
        }
      }
    } catch (e) {
      alert('There was an error while processing the changeGlyph command\n' + e);
    }
    progress.value = (i + 1);
  }

  progress.parent.close();
}
/**
 * basic file reading function
 * @param  {String} type the type of file
 * @return {String or null}
 */

function readfile(type, path) {
  var file_to_read = null;
  file_to_read = File(path + '/' + 'batch-find-and-replace.toml');
  if (file_to_read.exists !== true) {
    file_to_read = File.openDialog("Select a " + type + " file to import.",
      "*." + type, false);
  }

  var txt = null;
  if (file_to_read !== null) {
    file_to_read.open('r', 'TEXT', '????');
    txt = file_to_read.read();
    file_to_read.close();
  }
  if (txt !== null) {
    return txt;
  } else {
    alert('Error reading file');
    return null;
  }
}


function empty_fc_fields(mode) {

  if (mode == SearchModes.TEXT_SEARCH) {
    app.findTextPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
    app.changeTextPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!

  }
  if (mode == SearchModes.GREP_SEARCH) {

    app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!

  }
  if (mode == SearchModes.GLYPH_SEARCH) {
    app.findGlyphPreference = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
    app.changeGlyphPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!

  }

  if (mode == SearchModes.OBJECT_SEARCH) {
    app.findObjectPreference = NothingEnum.nothing; // now empty the find what field!!!thats important!!!
    app.changeObjectPreferences = NothingEnum.nothing; // empts the change to field!!!thats important!!!

  }

}


/**
 * Taken from ScriptUI by Peter Kahrel
 * @usage
 * var progress_win = new Window ("palette");
 *
 * var progress = progress_bar(progress_win, 100, 'my Progress');
 *
 *       progress.value = i++;
 *       progress.parent.close();// important close it!!
 *
 * @param  {Palette} w    the palette the progress is shown on
 * @param  {Number} stop [description]
 * @return {Progressbar}      [description]
 */

function progress_bar(w, stop, labeltext) {
  var txt = w.add('statictext', undefined, labeltext);
  var pbar = w.add("progressbar", undefined, 1, stop);
  pbar.preferredSize = [300, 20];
  w.show();
  return pbar;
}

bfnr_run();