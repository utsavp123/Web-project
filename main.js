// Data loading ================================================
let tblweddingcategories
let tblpostwedding
xmldataget()
jsondataget()

// XML data fetch====================================================
function xmldataget () {
  const XMLdata = new XMLHttpRequest()
  XMLdata.onload = function () {
    myFunction(this)
  }
  XMLdata.open('GET', 'tblweddingcategories.xml')
  XMLdata.send()
}
function myFunction (xml) {
  tblweddingcategories = xml.responseXML
  console.log(tblweddingcategories)
  let section = ''
  for (let i of tblweddingcategories.getElementsByTagName(
    'tblweddingcategories'
  )) {
    section += `     <div class="single-item">
        <div class="row">
        <div class="col-lg-4 col-md-4 d-flex align-items-center">
        <img class="top-img" src="image/${
          i.getElementsByTagName('preview_image')[0].childNodes[0].nodeValue
        }" alt="image">
        </div>
        <div class="col-lg-5 col-md-8 d-flex align-items-center justify-content-center">
        <div class="mid-area">
            <h4 class="text-center">${
              i.getElementsByTagName('wedding_type')[0].childNodes[0].nodeValue
            } </h4>
            <div class="title-bottom d-flex">

            </div>
            <h6 class="d-block text-center">Feature</h6>
            <div class="single-box d-flex">`

    for (let y of i.getElementsByTagName('feature')) {
      for (let z of y.getElementsByTagName('item')) {
        console.log(z.childNodes[0].nodeValue)
        section += `<div class="box-item">
              <span class="sub m-2">${z.childNodes[0].nodeValue}</span>
          </div>`
      }
    }
    section += ` </div>
        </div>
        </div>
        <div class="col-lg-3 d-flex align-items-center">
            <div class="prize-area text-center">
            <div class="contain-area">
                <span class="prize">prize</span>
                <h4 class="dollar"> $ ${
                  i.getElementsByTagName('offer_price')[0].childNodes[0]
                    .nodeValue
                } </h4>
                <a class="cmn-btn"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="weddingDetailsModalOpen (${
                  i.getElementsByTagName('id')[0].childNodes[0].nodeValue
                })">View Details</a>
            
            </div>
        </div>
    </div>
</div>
</div>`
  }
  document.getElementById('section').innerHTML = section
}
// XML data fetch=========================== END ====================

// JSON data fetch===================================================
jsondataget()
function jsondataget () {
  const JSONdata = new XMLHttpRequest()
  JSONdata.onload = function () {
    jsonDataFetch(this)
  }
  JSONdata.open('GET', 'tblpostwedding.json')
  JSONdata.send()
}
function jsonDataFetch (xml) {
  tblpostwedding = xml.responseText
  console.log(JSON.parse(tblpostwedding).data)
  section = ''
  section += `<div id="accordion" class="row justify-content-around w-100">`
  section += `</div>`
  document.getElementById('postWedding').innerHTML = section

  for (let i of JSON.parse(tblpostwedding).data) {
    let id = 'collapse' + i.wedding_type
    if (!document.getElementById(id)) {
      section1 = `<div class="cmn-btn btn-collapse col-md col-5 m-1">
          <div class="text-center">
              <a class="btn" data-bs-toggle="collapse" style="
              color: white;
          " href="#collapse${i.wedding_type}">
              ${i.wedding_type}
              </a>
          </div>
         
      </div>
      
      <div id="collapse${i.wedding_type}" class="collapse top-100" data-bs-parent="#accordion" style="position: absolute;z-index: -1;top: 110px;left: 0px;right: 0px;min-height: 400px;">
      <div class="card-body" >
          <div class="row cus-m" id="inner${i.wedding_type}">
              
          </div>
      </div>
  </div>`
      document.getElementById('accordion').innerHTML += section1
    }
  }

  for (let i of JSON.parse(tblpostwedding).data) {
    let id = 'collapse' + i.wedding_type
    if (document.getElementById(id)) {
      section = `<div class="col-lg-3 col-md-6 mt-3">
        <div class="single-item" style="
        box-shadow: 0px 0px 12px 0px #4609c3;
     ">
            <div class="img-area text-center">
                <img class="img-area m-0" src="image/events/${i.preview_image}" alt="image">
            </div>
            <div class=" text-center">
                <h5 class="my-2">${i.title}</h5>
                <p class="text-sm mt-1" style="max-height:60px; overflow:hidden ">${i.description}</p>
                 <p class="mt-2"> <span class="fas fa-location-dot"></span> ${i.location}</p>
                 <p class="text-sm mt-1"><span class="text-sm fas fa-calendar-alt"></span> ${i.wedding_date}</p>
                  <div class="mt-2">
                   <h5>${i.wedding_type}</h5>
                </div>
                </div>
          </div>
        </div>`
    }
    id = 'inner' + i.wedding_type
    document.getElementById(id).innerHTML += section
    $(document).ready(() => {
      $('.btn-collapse').click(() => {
        // val = $(document).scrollTop().valueOf()
        // window.scrollTo(0, val + 200)
      })

      $('#collapseElite').first().addClass('show')
    })
  }
}
// JSON data fetch============================ END ==================

function weddingDetailsModalOpen (id) {
  for (let i of tblweddingcategories.getElementsByTagName(
    'tblweddingcategories'
  )) {
    if (i.getElementsByTagName('id')[0].childNodes[0].nodeValue == id) {
      let section = `<div class="modal-header">
      <h5 class="modal-title w-100 text-center" id="exampleModalLabel">${
        i.getElementsByTagName('wedding_type')[0].childNodes[0].nodeValue
      }</h5>
      <!-- <button type="button" class="close" data-bs-dismiss="modal">&times;</button> -->
      <span aria-hidden="true" data-bs-dismiss="modal">&times;</span>
      </button>
  </div>
  <div class="modal-body">
      <div class="row m-0">
          <div class=" col-lg-6  ">
              <img class=" rounded" src="./image/${
                i.getElementsByTagName('preview_image')[0].childNodes[0]
                  .nodeValue
              }" alt="">
          </div>
          <div class=" col-lg-6 ">
              <div>
                  <p>A decoration is anything used to make something more attractive or festive. If you’re
                      having a Valentine’s Day party, drape your house in red and pink decorations.
                      Decoration is also a type of honor, like a soldier's medal or stripe.</p>
              </div>
              <div  class="row my-3">`
      for (let y of i.getElementsByTagName('feature')) {
        for (let z of y.getElementsByTagName('item')) {
          console.log(z.childNodes[0].nodeValue)
          section += `   <span class="blueBtn m-2  ">${z.childNodes[0].nodeValue}</span>`
        }
      }
      section += `
              </div>
              <h6 class="prize my-2" style="
              color: #38a7ff;
          ">prize</h6>
              <h5>  $${
                i.getElementsByTagName('offer_price')[0].childNodes[0].nodeValue
              }
      <del style="
      font-size: 1rem;
  ">$${i.getElementsByTagName('orignal_price')[0].childNodes[0].nodeValue}</del>
      </h5>

          </div>

      </div>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div>`
      document.getElementById('modalContent').innerHTML = section
    }
  }
}
$(document).ready(() => {
  $('.nav-show').click(() => {
    $('.showclass').fadeToggle('show')
    //  $(".show").fadeToggle()
  })
})
