Module.register("MMM-Ikea", {
  defaults: {
    ids: [],
    store: "",
    updateIntervall: 1800000
  },
  start: function () {
    var timer = setInterval(() => {
      const self = this;
      self.data.header = "LALALA";
      this.updateDom();
    }, this.config.updateIntervall)
  },
  getDom: function () {


    var element = document.createElement("div")

    // Erstelle eine Tabelle in HTML
    const table = document.createElement("table");
    table.setAttribute("border", "1");
    table.style.borderCollapse = "collapse";
    table.classList.add("table", "table-striped");

    const tr = document.createElement("tr");

    // Erstelle die Überschriften und füge sie der Tabelle hinzu
    const headers = ["Artikelnummer", "Name", "Preis", "Verfügbarkeit", "Bild"];
    for (let i = 0; i < headers.length; i++) {
      const th = document.createElement("th");
      th.textContent = headers[i];
      tr.appendChild(th);
    }
    table.appendChild(tr);

    this.config.ids.forEach(idString => {

      const id = idString.replaceAll('.','');
      const url = `https://sik.search.blue.cdtapps.com/de/de/search-result-page?q=${id}&store=${this.config.store}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const product = data.searchResultPage.products.main.items[0].product;
          var input = [];
          input.push(id);
          input.push(product.name);
          input.push(product.salesPrice.numeral + ' €');
          if (typeof product.availability !== 'undefined' && product.availability.length > 0) {
            input.push(product.availability[0].prefix + product.availability[0].store);
          } else {
            input.push('Keine Information');
          }

          const row = document.createElement('tr')

          input.forEach(element => {
            var entry = document.createElement('td')
            entry.innerHTML = element;
            row.appendChild(entry);
          });

          const img = document.createElement('img');
          img.src = product.mainImageUrl;
          img.style.margin = "0 auto";
          img.width = 60;
          // img.height = 75;

          row.appendChild(img);

          table.appendChild(row);

        });

    });

    element.appendChild(table);
    return element

  },
  notificationReceived: function (notification, payload, sender) {
    //  switch (notification) {
    //  case "DOM_OBJECTS_CREATED":
    //     // var timer = setInterval(() => {
    //     //   //this.updateDom()
    //     //   var countElm = document.getElementById("COUNT")
    //     //   countElm.innerHTML = "Count:" + this.count
    //     //   this.count++
    //     // }, 1000)
    //     break
    // }
  },
  socketNotificationReceived: function (notification, payload) {
    // switch (notification) {
    //   case "I_DID":
    //     // var elem = document.getElementById("COUNT")
    //     // elem.innerHTML = "Count:" + payload
    //     break
    // }
  },
})