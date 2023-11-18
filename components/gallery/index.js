

'use client'

import $ from 'jquery'
import React from "react";
class Card extends React.Component {
     constructor(props) {
    super(props);
    this.state = {activeCard: 0};
  }
  componentDidMount()
  {
    // "use strict";
$(document).ready(function() {

  var rows = 4; //change this also in css
  var cols = 4; //change this also in css
  var staggerTime = 150;

  var urls = [
    "https://res.cloudinary.com/dm79plror/image/upload/v1700285848/D767661D-00E4-4D9D-A782-8F6A5ED635E5_efn4ri.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700278768/WhatsApp_Image_2023-11-18_at_09.09.08_cl9zmi.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700287487/Screenshot_2023-11-18_at_11.34.23_AM_ryj6yr.png",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700285823/562C8AC9-3AD1-4749-AB1C-3B80F701DD7D_yizahf.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1699934756/Team/zikahd3jr0yixyf2wvvu.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700285755/187F6C42-50F8-4B47-8B69-2647BE27FFA8_hqrajm.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700285809/C5C03172-0543-4D4A-9A33-10ACB76D0E70_b6gajj.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700287805/IMG-20231022-WA0063_hf8x9n.jpg",
    "https://res.cloudinary.com/dm79plror/image/upload/v1700278263/WhatsApp_Image_2023-11-18_at_09.00.21_mavynh.jpg",
    "https://kiyutink.github.io/madrid/madrid2.jpg",
    "https://kiyutink.github.io/madrid/madrid3.jpg",
    "https://kiyutink.github.io/beijing/beijing1.jpg",
    "https://kiyutink.github.io/beijing/beijing2.jpg",
    "https://kiyutink.github.io/beijing/beijing3.jpg",
    "https://kiyutink.github.io/moscow/moscow1.jpg",
    "https://kiyutink.github.io/moscow/moscow2.jpg",
      ];

  var $gallery = $(".demo__gallery");
  var $help = $(".demo__help");
  var partsArray = [];
  var reqAnimFr = (function() {
    return window.requestAnimationFrame || function(cb) {
      setTimeout(cb, 1000 / 60);
    }
  })();

  
  $gallery.html('');
  for (let row = 1; row <= rows; row++) {
    partsArray[row - 1] = [];
    for (let col = 1; col <= cols; col++) {
      $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`);
      partsArray[row - 1][col - 1] = new Part();
    }
  }
  
  var $parts = $(".demo__part");
  var $image = $(".demo__part-back-inner");
  var help = true;

  for (let i = 0; i < $parts.length; i++) {
    $parts.find(".demo__part-front").eq(i).css("background-image", `url(${urls[i]})`);
  }

  $gallery.on("click", ".demo__part-front", function() {

    $image.css("background-image", $(this).css("background-image"));
    if (help) {
      $help.html("Click any of the tiles to get back");
      help = false;
    }

    let row = +$(this).closest(".demo__part").attr("row");
    let col = +$(this).closest(".demo__part").attr("col");
    waveChange(row, col);
  });

  $gallery.on("click", ".demo__part-back", function() {
    if (!isShowingBack()) return;

    $help.html(`Check out my other <a target="blank" href="https://codepen.io/kiyutink/">pens</a> and follow me on <a target="_blank" href="https://twitter.com/kiyutin_k">twitter</a>`);

    setTimeout(function() {
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          partsArray[row - 1][col - 1].showing = "front";
        }
      }
    }, staggerTime + $parts.length * staggerTime / 10);
    
    
    showFront(0, $parts.length);
    
  });
  
  function showFront(i, maxI) {
    if (i >= maxI) return;
    $parts.eq(i).addClass("show-front");
    
    reqAnimFr(function() {
      showFront(i + 1);
    });
  }

  function isShowingBack() {
    return partsArray[0][0].showing == "back" && partsArray[0][cols - 1].showing == "back" && partsArray[rows - 1][0].showing == "back" && partsArray[rows - 1][cols - 1].showing == "back";
  }

  function Part() {
    this.showing = "front";
  }

  function waveChange(rowN, colN) {
    if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
    if (partsArray[rowN - 1][colN - 1].showing == "back") return;
    $(".demo__part-" + rowN + "-" + colN).removeClass("show-front");
    partsArray[rowN - 1][colN - 1].showing = "back";
    setTimeout(function() {
      waveChange(rowN + 1, colN);
      waveChange(rowN - 1, colN);
      waveChange(rowN, colN + 1);
      waveChange(rowN, colN - 1);
    }, staggerTime);
  }
});
  }
   render()
   {
    return (
    <div className="demo">
  {/* <div className="demo__help" style={{color: 'black'}}>Choose a photo</div> */}
  <div className="demo__gallery">
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
    <div className="demo__placeholder" />
  </div>
</div>
    )
   }
}


export default Card;