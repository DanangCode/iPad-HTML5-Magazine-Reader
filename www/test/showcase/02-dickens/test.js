Monocle.DEBUG = true;

(function () {

  Monocle.Styles.container.right = "24px";

  var bookData = {
    getComponents: function () {
      return [
        'components/1.html',
        'components/2.html',
        'components/3.html'
      ];
    },
    getContents: function () {
      return [
        {
          title: "The Signal Man",
          src: "components/1.html"
        },
        {
          title: "The Haunted House",
          src: "components/2.html",
          children: [
            {
              title: "Chapter I — The Mortals in the House",
              src: "components/2.html#p2ch1"
            },
            {
              title: "Chapter II — The Ghost in Master B.'s Room",
              src: "components/2.html#p2ch2"
            }
          ]
        },
        {
          title: "The Trial for Murder",
          src: "components/3.html"
        }
      ]
    },
    getComponent: function (componentId) {
      return { url: componentId }
    },
    getMetaData: function(key) {
      return {
        title: "Three Ghost Stories",
        creator: "Charles Dickens"
      }[key];
    }
  }

  // Initialize the reader element.
  Monocle.Events.listen(
    window,
    'load',
    function () {
      var readerOptions = {};

      /* PLACE SAVER */
      var bkTitle = bookData.getMetaData('title');
      var placeSaver = new Monocle.Controls.PlaceSaver(bkTitle);
      readerOptions.place = placeSaver.savedPlace();
      readerOptions.panels = Monocle.Panels.Marginal;
      readerOptions.stylesheet = "body { " +
        "color: #210;" +
        "font-family: Palatino, Georgia, serif;" +
      "}";

      /* Initialize the reader */
      window.reader = Monocle.Reader(
        'reader',
        bookData,
        readerOptions,
        function(reader) {
          reader.addControl(placeSaver, 'invisible');

          /* SPINNER */
          var spinner = Monocle.Controls.Spinner(reader);
          reader.addControl(spinner, 'page', { hidden: true });
          spinner.listenForUsualDelays('reader');

          /* Because the 'reader' element changes size on window resize,
           * we should notify it of this event. */
          Monocle.Events.listen(
            window,
            'resize',
            function () { window.reader.resized() }
          );

          /* MAGNIFIER CONTROL */
          var magnifier = new Monocle.Controls.Magnifier(reader);
          reader.addControl(magnifier, 'page');


          /* BOOK TITLE RUNNING HEAD */
          var bookTitle = {}
          bookTitle.contentsMenu = Monocle.Controls.Contents(reader);
          reader.addControl(bookTitle.contentsMenu, 'popover', { hidden: true });
          bookTitle.createControlElements = function () {
            var cntr = document.createElement('div');
            cntr.className = "bookTitle";
            var runner = document.createElement('div');
            runner.className = "runner";
            runner.innerHTML = reader.getBook().getMetaData('title');
            cntr.appendChild(runner);

            Monocle.Events.listenForContact(
              cntr,
              {
                start: function (evt) {
                  if (evt.preventDefault) {
                    evt.stopPropagation();
                    evt.preventDefault();
                  } else {
                    evt.returnValue = false;
                  }
                  reader.showControl(bookTitle.contentsMenu);
                }
              }
            );

            return cntr;
          }
          reader.addControl(bookTitle, 'page');


          /* CHAPTER TITLE RUNNING HEAD */
          var chapterTitle = {
            runners: [],
            createControlElements: function (page) {
              var cntr = document.createElement('div');
              cntr.className = "chapterTitle";
              var runner = document.createElement('div');
              runner.className = "runner";
              cntr.appendChild(runner);
              this.runners.push(runner);
              this.update(page);
              return cntr;
            },
            update: function (page) {
              var place = reader.getPlace(page);
              if (place) {
                this.runners[page.m.pageIndex].innerHTML = place.chapterTitle();
              }
            }
          }
          reader.addControl(chapterTitle, 'page');
          reader.listen(
            'monocle:pagechange',
            function (evt) { chapterTitle.update(evt.m.page); }
          );


          /* PAGE NUMBER RUNNING HEAD */
          var pageNumber = {
            runners: [],
            createControlElements: function (page) {
              var cntr = document.createElement('div');
              cntr.className = "pageNumber";
              var runner = document.createElement('div');
              runner.className = "runner";
              cntr.appendChild(runner);
              this.runners.push(runner);
              this.update(page);
              return cntr;
            },
            update: function (page, pageNumber) {
              if (pageNumber) {
                this.runners[page.m.pageIndex].innerHTML = pageNumber;
              }
            }
          }
          reader.addControl(pageNumber, 'page');
          reader.listen(
            'monocle:pagechange',
            function (evt) {
              pageNumber.update(evt.m.page, evt.m.pageNumber);
            }
          );

          /* Scrubber */
          var scrubber = new Monocle.Controls.Scrubber(reader);
          reader.addControl(scrubber, 'popover', { hidden: true });
          var showFn = function (evt) {
            evt.stopPropagation();
            reader.showControl(scrubber);
            scrubber.updateNeedles();
          }
          for (var i = 0; i < chapterTitle.runners.length; ++i) {
            Monocle.Events.listenForContact(
              chapterTitle.runners[i].parentNode,
              { start: showFn }
            );
            Monocle.Events.listenForContact(
              pageNumber.runners[i].parentNode,
              { start: showFn }
            );
          }
        }
      );
    }
  );
})();
