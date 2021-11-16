var brand, category, discount, product;

window.onload = function () {
  brand = [
    {
      id: 1,
      name: "Gucci",
    },
    {
      id: 2,
      name: "Prada",
    },
    {
      id: 3,
      name: "Nike",
    },
    {
      id: 4,
      name: "Sergio Taccini",
    },
    {
      id: 5,
      name: "Adidas",
    },
  ];

  category = [
    {
      id: 1,
      name: "Shoes",
    },
    {
      id: 2,
      name: "Shirt",
    },
    {
      id: 3,
      name: "Jacket",
    },
    {
      id: 4,
      name: "Pants",
    },
    {
      id: 5,
      name: "Dress",
    },
  ];

  product = [
    {
      id: 1,
      name: "Adidas Jacket T564",
      imageSrc: "image (1).aspx",
      price: {
        oldPrice: "34,10",
        newPrice: "29",
      },
      freeDelivery: true,
      idBrand: 5,
      idCategory: 3,
      discount: null,
      specifications: [
        {
          name: "Size",
          value: "XL",
        },
        {
          name: "Color",
          value: "Red",
        },
        {
          name: "Composition",
          value: "Cotton",
        },
      ],
    },
    {
      id: 2,
      name: "Nike Shoes s34",
      imageSrc: "image (2).aspx",
      price: {
        oldPrice: null,
        newPrice: "29",
      },
      freeDelivery: false,
      idBrand: 3,
      idCategory: 1,
      discount: 1,
      specifications: [
        {
          name: "Size",
          value: "M",
        },
        {
          name: "Color",
          value: "Black",
        },
        {
          name: "Composition",
          value: "silk",
        },
      ],
    },
    {
      id: 3,
      name: "Gucci dress",
      imageSrc: "image.aspx",
      price: {
        oldPrice: "50",
        newPrice: "37",
      },
      freeDelivery: true,
      idBrand: 1,
      idCategory: 5,
      discount: 2,
      specifications: [
        {
          name: "Size",
          value: "Xl",
        },
        {
          name: "Color",
          value: "Green",
        },
        {
          name: "Composition",
          value: "synthetics",
        },
      ],
    },
    {
      id: 4,
      name: "Gucci Shoes",
      imageSrc: "image.aspx",
      price: {
        oldPrice: "90",
        newPrice: "87",
      },
      freeDelivery: true,
      idBrand: 1,
      idCategory: 1,
      discount: 2,
      specifications: [
        {
          name: "Size",
          value: "S",
        },
        {
          name: "Color",
          value: "Blue",
        },
        {
          name: "Composition",
          value: "synthetics",
        },
      ],
    },
    {
      id: 5,
      name: "Nike dress",
      imageSrc: "image (1).aspx",
      price: {
        oldPrice: "40",
        newPrice: "29",
      },
      freeDelivery: false,
      idBrand: 3,
      idCategory: 5,
      discount: 1,
      specifications: [
        {
          name: "Size",
          value: "XS",
        },
        {
          name: "Color",
          value: "Red-white",
        },
        {
          name: "Composition",
          value: "cotton",
        },
      ],
    },
    {
      id: 6,
      name: "Sergio Taccini jacket",
      imageSrc: "image (1).aspx",
      price: {
        oldPrice: "70",
        newPrice: "64",
      },
      freeDelivery: false,
      idBrand: 4,
      idCategory: 3,
      discount: 1,
      specifications: [
        {
          name: "Size",
          value: "S",
        },
        {
          name: "Color",
          value: "black",
        },
        {
          name: "Composition",
          value: "cotton",
        },
      ],
    },
    {
      id: 7,
      name: "Prada pants",
      imageSrc: "image (1).aspx",
      price: {
        oldPrice: "70",
        newPrice: "64",
      },
      freeDelivery: true,
      idBrand: 2,
      idCategory: 4,
      discount: 2,
      specifications: [
        {
          name: "Size",
          value: "XXL",
        },
        {
          name: "Color",
          value: "blue",
        },
        {
          name: "Composition",
          value: "cotton",
        },
      ],
    },
  ];

  discount = [
    {
      id: 1,
      name: "Black friday",
      colorClass: "blackfriday",
    },
    {
      id: 2,
      name: "Shopping mania",
      colorClass: "shoppingmania",
    },
  ];
  console.log(brand);
  console.log(category);
  console.log(product);

  dropDownList(brand, "#Brand", "dropDownBrend", "Brendovi");
  dropDownList(category, "#Category", "dropDownCategory", "Kategorije");

  printProducts(product);

  $(document).on("change", "#Category", function () {
    let idCategory = $("#dropDownCategory").val();
    filter(idCategory, "idCategory");

    /* let filterProd = [];
    for (let item of product) {
      if (idCategory == item.idCategory) {
        filterProd.push(item);
      }
    }
    printProducts(filterProd);
    */
  });

  $(document).on("change", "#Brand", function () {
    let idBrand = $("#dropDownBrend").val();
    filter(idBrand, "idBrand");
    /*let filterBrand = [];
    for (let item of product) {
      if (idBrand == item.idBrand) {
        filterBrand.push(item);
      }
    }
    printProducts(filterBrand);
    */
  });

  $(document).on("change", "#sort", function () {
    let sortingType = $("#sort").val();

    if (sortingType == "nameAsc") {
      product.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (sortingType == "nameDesc") {
      product.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (sortingType == "priceAsc") {
      product.sort(function (a, b) {
        return a.price.newPrice - b.price.newPrice;
      });
    }

    if (sortingType == "priceDesc") {
      product.sort(function (a, b) {
        return b.price.newPrice - a.price.newPrice;
      });
    }

    printProducts(product);
  });
};

function filter(id, svojstvo) {
  let filterProduct = product.filter((item) => item[svojstvo] == id);
  printProducts(filterProduct);
}

function dropDownList(data, idBlock, idList, textLabele) {
  let text = `<div classs="form-group">
    <label >${textLabele}</label>
      <select id="${idList}" class="form-control">
      <option value="0">Select<option>`;

  for (let oneData of data) {
    text += `<option value="${oneData.id}">${oneData.name}</option>`;
  }
  text += `</select> </div>`;

  $(idBlock).html(text);
}

function printProducts(products) {
  let print = "";
  if (products.length == 0) {
    print += `<div class="row">
    <div class="col-12">
      <p>No products</p>
      </div>
      </div>`;
  } else {
    for (let oneProduct of products) {
      print += `<div class="row border my-3">
            <div class="col-4">
            <img src="${oneProduct.imageSrc}" alt="${oneProduct.name}" 
      class="img-fluid"/>
            </div>
            <div class="col-8">
            <h1>${oneProduct.name}</h1>
            <p>${processingCat(oneProduct.idCategory)}</p>
            <p>${processingBrand(oneProduct.idBrand)}</p>
            <p>${processingDelivery(oneProduct.freeDelivery)}/<p>
            <p>${processingDiscount(oneProduct.discount)}</p>
            <p>${processingPrice(oneProduct.price)}</p>
            <div>
            <p>Specifikacije</p>
            <ul>
            ${processingSpecifications(oneProduct.specifications)}
            </ul>
            </div>
            </div>
          </div>`;
    }
  }
  $("#printProducts").html(print);
}

function processingCat(id) {
  let categoryF = "";
  for (oneCategory of category) {
    if (id == oneCategory.id) {
      categoryF = oneCategory.name;
    }
  }
  return categoryF;
}

function processingBrand(id) {
  let brandF = "";
  for (let oneBrand of brand) {
    if (id == oneBrand.id) {
      brandF = oneBrand.name;
    }
  }
  return brandF;
}

function processingDiscount(value) {
  let disc = "";
  if (value != null) {
    for (let oneDisc of discount) {
      if (value == oneDisc.id)
        disc += `<div class="${oneDisc.colorClass}">${oneDisc.name}</div>`;
    }
  }
  return disc;
}

function processingDelivery(delivery) {
  let html = "";
  if (delivery) {
    html += `<p clas="alert alert-succes">Delivery is free</p>`;
  } else {
    html += `<p class="alert alert-danger">Delivery is not free</p>`;
  }
  return html;
}

function processingPrice(price) {
  let print = "";
  if (price.oldPrice != null) {
    print += `<p>Old price:</p>
    <del>${price.oldPrice}</del>
    <p></p>
    <p>New price:</p>
    <span>${price.newPrice}</span>`;
  } else {
    print += `<p>New price:</p>
    <span>${price.newPrice}</span>`;
  }
  return print;
}

function processingSpecifications(spec) {
  let print = "";
  for (let oneSpec of spec) {
    print += `<li>${oneSpec.name}:${oneSpec.value}</li>`;
  }
  return print;
}
