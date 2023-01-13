const xhttp = new XMLHttpRequest()
xhttp.onload = function () {
  myFunction(this)
}
xhttp.open('GET', 'tblweddingcategories.xml')
xhttp.send()

function myFunction (xml) {
  const xmlDoc = xml.responseXML
  const x = xmlDoc.getElementsByTagName('tblweddingcategories')
  let section = ''
  for (let i = 0; i < x.length; i++) {
    section += `     <div class="single-item">
        <div class="row">
        <div class="col-lg-4 col-md-4 d-flex align-items-center">
        <img class="top-img" src="image/${
          x[i].getElementsByTagName('preview_image')[0].childNodes[0].nodeValue
        }" alt="image">
        </div>
        <div class="col-lg-5 col-md-8 d-flex align-items-center justify-content-center">
        <div class="mid-area">
            <h4 class="text-center">${
              x[i].getElementsByTagName('wedding_type')[0].childNodes[0]
                .nodeValue
            } </h4>
            <div class="title-bottom d-flex">

            </div>
            <h6 class="d-block text-center">Feature</h6>
            <div class="single-box d-flex">`

    for (let y of x[i].getElementsByTagName('feature')) {
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
                  x[i].getElementsByTagName('price')[0].childNodes[0].nodeValue
                } </h4>
                <a href="tournaments-single.html" class="cmn-btn">View Details</a>
            
            </div>
        </div>
    </div>
</div>
</div>`
  }
  document.getElementById('section').innerHTML = section
}
