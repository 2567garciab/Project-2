// Read in data first
d3.csv("./updated_three_years.csv").then(function(tableData) {
  console.log(tableData)

  //Create Dropdown Arrays
  bizzNameList = []
  //zipCodeList = []
  addressList = []
  tableData.forEach(function(inspection) {
    bizzNameList.push(inspection.AKA_name)
    addressList.push(inspection.Address)
  });


  //Fill in Business Name dropdown
  var biznameselect = document.getElementById("inputBizz");
  var biznameoptions = bizzNameList
  for(var i = 0; i < biznameoptions.length; i++) {
    var opt = biznameoptions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    biznameselect.appendChild(el);
  };


  //Fill in Address dropdown
  var addresslistselect = document.getElementById("inputAddress");
  var addresslistoptions = addressList
  for(var i = 0; i < addresslistoptions.length; i++) {
    var opt = addresslistoptions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    addresslistselect.appendChild(el);
  };

  //d3.selectAll(".filter").on("change", dropdownFilter);
  //function dropdownFilter () {
  //    var inputBizzsubmit = d3.select("#inputBizz").node().value
  //    addressList = []
  //      tableData.forEach(function(inspection) {
  //        if (inputBizzsubmit === inspection.AKA_name) {
  //          addressList.push(inspection.Address)
  //      }});

  //  d3.select("#inputAddress").on(change)
  //  };

  //Function for starting Javascript after submission
  function handleSubmit() {
    d3.event.preventDefault();
    inputBizzsubmit = String(d3.select("#inputBizz").node().value);
    runValue();
    console.log(inputBizzsubmit);
    };

  //Populate table based on Business dropdown submission
  function runValue() {
    var table = d3.select("#completeDataTable");
    var tbody = table.select("tbody");
    tbody.html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#inputBizz");
    var inputValue = inputElement.property("value");
    console.log(inputValue)
    i = inputValue
    tableData.forEach(function(inspection) {
      y = inspection.AKA_name
      tableinfoentry = [inspection.Inspection_ID, inspection.AKA_name, inspection.Address, inspection.Inspection_date, inspection.Inspection_type, inspection.Results]
      if (i === y) {
        var row = tbody.append("tr");
        Object.entries(tableinfoentry).forEach(function([key, value]) {
            console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        })
      }
    })
  };


  //Handle the Actions on the Page
  var filterbutton = d3.select("#submitbutton");
  filterbutton.on("click", handleSubmit);

});

