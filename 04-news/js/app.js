// Data
import {newsData} from "../data/news.js";
// console.log(newsData);

// DOM Element
const newsDiv = document.getElementById("news");

// Datayı al - kartlara yerleştir:
const loadData = () => {
    let str = "";
    newsData.forEach((item) => {
        str += createNewsCard(item);
        console.log(str);
    });
    document.getElementById("news").innerHTML = str;
}

// Kart oluşturup bilgileri gerekli yerelere ata:
const createNewsCard = (item) => {
    let like = createLike(item.like);
    return `
    <div class="col">
        <div class="card h-100" data-id="${item.id}">
            <img src="${item.image}" class="card-img-top" style="width:100%; height:350px; object-fit:cover" alt="${item.title}">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <h5 class="card-text text-danger">${like}</h5>
                <p>${item.description}</p>
            </div>
        </div>
    </div>
    `;
}

// Like logic ekle
const createLike = (like, likeLimit = 5) => {
    let likeHearts = "";
    for(let i = 0 ; i < likeLimit; i++){
        if(i < like){
            likeHearts += `<i class="fa-solid fa-heart me-1"></i>`;
        } else {
            likeHearts += `<i class="fa-regular fa-heart me-1"></i>`;
        }
    }

    return likeHearts;
}

// Haberi büyüt, content'i getir
newsDiv.addEventListener("click", (e) => {

    let newsId = e.target.closest(".card").dataset.id; // getAttribute("data-id");
    // console.log(newsId, typeof(newsId));

    let filteredNews = newsData.find((item) => item.id === Number(newsId));

    // let filteredNews2 = newsData.filter((item) => item.id === Number(newsId));

    let newsDetails = createNewsDetails(filteredNews);
    document.getElementById("newsDetails").innerHTML = newsDetails;

    window.scrollTo(0,0);


});

const createNewsDetails = (item) => {

    let like = createLike(item.like);

    return `
    <div class="col">
        <img src="${item.image}" class="img-fluid rounded" alt="${item.title}"/>
    </div>
    <div class="col">
        <h3 class="mb-3">${item.title}</h3>
        <span class="mb-3">${like}</span>
        <h5 class="mb-3">${item.description}</h5>
        <p>${item.content}</p>
    </div>
    `;

}

// card
//      card-header
//      card-img-top
//      card-body
//              card-title
//              card-text
//      card-img-bottom
//      card-footer

loadData();
