$(document).ready(function () {
  $.ajax({
    url: "data/menu.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      printManu(data);
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });
  var categoryJs;
  $.ajax({
    url: "data/category.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      printCategory(data, "#Category", "Category");
      categoryJs = data;
      if (categoryJs && brandJs && discountJs && productJs) {
        printProducts(productJs, "#printProducts");
      }
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });
  var brandJs;
  $.ajax({
    url: "data/brand.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      printBrand(data, "#Brand", "Brand");
      brandJs = data;
      if (categoryJs && brandJs && discountJs && productJs) {
        printProducts(productJs, "#printProducts");
      }
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });
  var productJs;
  $.ajax({
    url: "data/product.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      productJs = data;
      if (categoryJs && brandJs && discountJs && productJs) {
        printProducts(productJs, "#printProducts");
      }
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });

  var discountJs;
  $.ajax({
    url: "data/discount.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      discountJs = data;
      if (categoryJs && brandJs && discountJs && productJs) {
        printProducts(productJs, "#printProducts");
      }
    },
    error: function (xhr) {
      console.log(xhr);
    },
  });

  //dodeljivanje dogadjaja za brendove,kategorije

  $(document).on("change", "#Category", function () {
    let idCat = $("#listCat").val();
    filter(idCat, "idCategory");
  });

  $(document).on("change", "#Brand", function () {
    let idBrand = $("#listBrand").val();
    filter(idBrand, "idBrand");
  });

  //sortiranje proizvoda po imenu i ceni

  $(document).on("change", "#sortDiv", function () {
    let idSort = $("#sort").val();
    if (idSort == "nameAsc") {
      productJs.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (idSort == "nameDesc") {
      productJs.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (idSort == "priceAsc") {
      productJs.sort(function (a, b) {
        return a.price.newPrice - b.price.newPrice;
      });
    }
    if (idSort == "priceDesc") {
      productJs.sort(function (a, b) {
        return b.price.newPrice - a.price.newPrice;
      });
    }

    printProducts(productJs, "#printProducts");
  });

  //filtriranje brendova i kategorija

  function filter(value, property) {
    let filterProduct = productJs.filter((item) => item[property] == value);
    printProducts(filterProduct, "#printProducts");
  }

  //ispisivanje menija
  function printManu(links) {
    let html = "";
    for (let item of links) {
      html += `
       <div id="wrappMenu">
          <ul class="navbar-nav" >
            <li class="nav-item active" >
              <a class="nav-link" href="${item.href}" id="menuClass">${item.tekst}<span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      `;
    }

    document.querySelector("#menu").innerHTML = html;
  }
  //ispisivanje kategorija
  function printCategory(linkCat, divCat, textLabel) {
    let html = `<label for="exampleFormControlSelect1">${textLabel}</label>
    <select class="form-control" id="listCat">
    <option value="0">Select</option>`;

    for (let item of linkCat) {
      html += `<option value="${item.id}">${item.name}</option>`;
    }
    html += `</select>`;
    $(divCat).html(html);
  }

  //ispisivanje brendova

  function printBrand(listBr, divBrand, textLabel) {
    let html = `<label for="exampleFormControlSelect1">${textLabel}</label>
        <select class="form-control" id="listBrand">
        <option value="0">Select</option>`;

    for (let item of listBr) {
      html += `<option value="${item.id}">${item.name}</option>`;
    }
    html += `</select>`;
    $(divBrand).html(html);
  }

  //ispisivanje proizvoda

  function printProducts(listProd, divProd) {
    let html = "";
    if (listProd.length == 0) {
      html += `<p>No product</p>`;
    }

    for (let item of listProd) {
      html += `<div class="row" id="productRow">
            <div class="col-lg-4">
                <img src="${item.imageSrc}" href="#" class="img-fluid">
            </div>

            <div class="col-lg-8">
                <h2>${item.name}</h2>
                <p>Old price: <del>${item.price.oldPrice}</del></p>
                <p>New price: ${item.price.newPrice}</p>
                <p>${proccesingDelivery(item.freeDelivery)}</p>
                <p>${proccesingCat(item.idCategory)}</p>
                <p>${proccesingBrand(item.idBrand)}</p>
                <p>${proccesingDisc(item.discount)}</p>
            </div>
        </div>
        <hr/>`;
    }
    $(divProd).html(html);
  }

  // ispisivanje dostave

  function proccesingDelivery(data) {
    let html = "";
    if (data == true) {
      html += `<p>Delivery is free</p>`;
    } else {
      html += `<p>Delivery is not free</p>`;
    }
    return html;
  }
  //ispisivanje kategorije
  function proccesingCat(id) {
    let html = "";
    for (let item of categoryJs) {
      if (id == item.id) {
        html = item.name;
      }
    }
    return html;
  }
  // ispisivanje brendova
  function proccesingBrand(id) {
    let html = "";
    for (let item of brandJs) {
      if (id == item.id) {
        html = item.name;
      }
    }
    return html;
  }
  // ispisivanje popusta
  function proccesingDisc(value) {
    let html = "";
    if (value != null) {
      for (let item of discountJs) {
        if (value == item.id) {
          html += `<div class="${item.colorClass}">${item.name}</div>`;
        }
      }
    } else {
      html += `<p>no disc</p>`;
    }
    return html;
  }

  //REG EXP VALIDATION

  var buttonReg = document.querySelector("#buttonValidation");
  buttonReg.addEventListener("click", function check(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    var nameValue = document.querySelector("#form-name").value;
    var emailValue = document.querySelector("#form-email").value;
    var phoneValue = document.querySelector("#form-phone").value;
    var messageValue = document.querySelector("#form-text").value;

    var name = document.querySelector("#form-name");
    var email = document.querySelector("#form-email");
    var phone = document.querySelector("#form-phone");
    var message = document.querySelector("#form-text");

    var nameRegEx = /^[A-Z][a-z]+$/;
    if (!nameRegEx.test(nameValue)) {
      name.classList.remove("correct");
      name.classList.add("incorrect");
    } else {
      name.classList.remove("incorrect");
      name.classList.add("correct");
    }

    var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailRegEx.test(emailValue)) {
      email.classList.remove("correct");
      email.classList.add("incorrect");
    } else {
      email.classList.remove("incorrect");
      email.classList.add("correct");
    }

    var phoneRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneRegEx.test(phoneValue)) {
      phone.classList.remove("correct");
      phone.classList.add("incorrect");
    } else {
      phone.classList.remove("incorrect");
      phone.classList.add("correct");
    }

    var messageRegEx = /^[A-ZČĆŽŠĐ][a-zčćžšđ]([\d \w]{5,100})$/;
    if (!messageRegEx.test(messageValue)) {
      message.classList.remove("correct");
      message.classList.add("incorrect");
    } else {
      message.classList.remove("incorrect");
      message.classList.add("correct");
    }
  });
});
/*
  function validation() {
    if (nameReg.value == "") {
      $("nameTitle").addClass("#colorTitleName");
      errors.push("jhdbckbenwdix");

      
      nameReg.value = "This field is required";
      nameReg.getElementsByClassName.color = "red";
      */
