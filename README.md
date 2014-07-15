batch-find-and-replace
======================

This is a Adobe InDesign script for batch processing find and replace xmls. You can process
GREP, TEXT, GLYPH and OBJECT searches.  
@author: fabiantheblind  
@version: 0.1.4

Thanks go to:   
- [Tom's Obvious, Minimal Language](https://github.com/mojombo/toml) By [Tom Preston-Werner](https://github.com/mojombo)  
- [toml.js]( https://github.com/JonAbrams/tomljs) by [JonAbrams](https://github.com/JonAbrams)  
- [JsonDiffPatch.js](https://github.com/benjamine/JsonDiffPatch) by [benjamine](https://github.com/benjamine)   

Without these three open source projects this would not be possible.

##Purpouse
While creating books in InDesign with several documents we always come across some find change queries that need to be used again, and again, and again. To make this process easier you can just grab their names and put them into a list. The script will than try to precess all your queries in one click.  

##files  
In the folder __dist__ you can find the full script (batch-find-and-replace.jsx) with the libraries enclosed and an example toml file (batch-find-and-replace.toml). This is all you need to get started right away. Place them both into your [Scripts Panel](http://help.adobe.com/en_US/indesign/cs/using/WS0836C26E-79F9-4c8f-8150-C36260164A87a.html#WSDCB06999-2544-48c9-B348-888301FC6BA0a)  

##prerequisites
1. make sure you have a toml file.
2. make sure the toml file is next to the script.
3. make sure the toml file has the right formatting (see below in section TOML)
4. if you want the script to autoexecute (without toml file selection), make sure the .toml file has the right name: "batch-find-and-replace.toml"
5. make sure your fcqueries work right 

##Usage
- Place the script and the toml file into your [Scripts Panel Folder](http://help.adobe.com/en_US/indesign/cs/using/WS0836C26E-79F9-4c8f-8150-C36260164A87a.html#WSDCB06999-2544-48c9-B348-888301FC6BA0a)  
- define some find and change queries and save them via the [InDesign dialogue](http://help.adobe.com/en_US/indesign/cs/using/WSFB3603CC-8D84-48d8-9F77-F3E0644CB0B6a.html#WS293D91C6-1153-4f92-A260-24B1A59E10B4a).
- get the xml file names and add them to the __"batch-find-and-replace.toml"__ file in the right spot. text search goes into `text.files = []`, grep search goes into `grep.files = []` and so on. Make shure to remove the .xml from the filename. You can find these files on:
- - __Mac OS__ Users\[username]\Library\Preferences\Adobe InDesign\[Version]\[Language]\Find-Change Queries\[query type]  
- - __Windows XP__ Documents and Settings\[username]\Application Data\Adobe\InDesign\[Version]\[Language]\Find-Change Queries\[query type]  
- - __Windows Vista and Windows 7__ Users\[username]\AppData\Roaming\Adobe\InDesign\[Version]\[Language]\Find-Change Queries\[query type]  
- the .toml file should be located next to the script file and have the  appropriate name (batch-find-and-replace.toml). If so the script wont ask for the toml file and process the data right away. If not the script will ask you to select the .toml file.
- Thats it. Watch the magick happen.

##TOML
[Tom's Obvious, Minimal Language](https://github.com/mojombo/toml) is a simple markup language that makes settings human readable. It is still in development and may change a lot. But still. It is a pretty easy language and can be learned by anyone.  
The basic toml filer looks like this:  

    # these are the basic settings
    # the MUST be there
    do_text = true
    do_grep = true
    do_glyph = true
    do_object = false
    do_all_docs = true
    # now the file names
    # they have to be in one line
    # the toml specs say you can break lines in arrays
    # but the toml.js does not allow that at the moment
    [text]
    files = ["my_first_text_find_and_change","another one"]
    [grep]
    files = ["somegrepsearch", "find tabs", "something else"]
    [glyph]
    files = []
    [objects]
    files = []

###MUST HAVE Settings
With the `do_text`, `do_object`, `do_grep` and `do_glyph` you can define if the script should do the corresponding find and replace. Set them to `true` or `false`.  
With the `do_all_docs` setting you can define to use just the front most document or all open documents. Set it to `true` if you want to process all open documents.  

###CAN HAVE Settings
In the `[text]`,`[grep]`,`[glyph]` and `[objects]` areas you can define the filenames that should be processed. Make sure the filenames are written right. If there is a file mentioned that does not exist the script will throw an error. It will try to process all the .xml files it can find. __!IMPORTANT!__ you MUST remove the .xml from the filename in the list as shown above.

##FAQ  
Nothing yet. Feel free to ask and report issues ;)  

##Version History  
- 0.1.4 fixed typo. Do all docs can hang itself when having to many files
- - maybe we should switch to book usage instead
- 0.1.3 working on do all docs. more grunt
- 0.1.2 working on do all docs. added grunt
- 0.1.1 Added do all docs feature  
- 0.1 initial release  

##To Dos  

- Make it work with InDesign Books or an folder of InDesign docs.  
- add support for several docs


##develop  

If you want to develop on this project fork it or clone it with git

    git clone https://github.com/fabiantheblind/batch-find-and-replace.git
    cd batch-find-and-replace


In the __src__ folder you will find the development files. The libraries are external and enclosed in the repository as submodules. If you want to set up these you have to run first:  

    git submodule init  

Than update the submodules with  

    git submodule update  

See the progit documentation on submodules [here](http://git-scm.com/book/ch6-6.html).

Install [nodejs and npm](https://gist.github.com/isaacs/579814) the way you like it.  

To build the release script with all files put together I use [grunt](http://gruntjs.com/). install this as well.  

Then run

    npm install   
    
in the root of the project.  
Then run grunt  

    grunt  

This should build the whole script into the __build__ folder.  

##License
All code is under MIT License
Copyright (c)  2013 Fabian "fabiantheblind" Morón Zirfas  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

see also http://www.opensource.org/licenses/mit-license.php

