

'use client'

import $ from 'jquery'
import React from "react";
class Card extends React.Component {
     constructor(props) {
    super(props);
    this.state = {activeCard: 0};
  }
    stateSetter = (i) => {
        this.setState({activeCard: i})
    }
    componentDidMount()
    {
      // You can change the speed and amount of cards here
var cardAmount = 4;
var flipSpeed = 1500;

// Preload all images to prevent blank cards
// because they're switched with CSS classes
(function preload(imageArray) {
    $(imageArray).each(function(){
        $('<img/>')[0].src = this;
    });
})(['https://source.unsplash.com/YQ3FpeQkNhA/800x600',
	'https://source.unsplash.com/gGC63oug3iY/800x600',
	'https://source.unsplash.com/PAcI-vmFL2g/800x600',
	'https://source.unsplash.com/_d0zgyMmYT8/800x600']);

// 3D flip slideshow
let bfCards = (elements, speed) => {
	var cards = $('.cards');
	var container = cards.children('.cards__container');
	var front = container.children('.cards__front');
	var back = container.children('.cards__back');

	function swapArticleClass(element, newClass) {
		element.removeClass(function(index, css) {
			return (css.match(/(^|\s)card-\S+/g) || []).join(' ');
		});

		element.addClass(newClass);
	}

	const onTick = (i) => {
                     this.setState({ activeCard: i });

		setTimeout(() => {
			var nextClass;
			var currentClass = 'card-' + i;

			if (currentClass === elements)  {
				nextClass = 'card-' + (i + 1);
			} else {
				nextClass = 'card-1';
			}

			if (i % 2 === 0) {
				cards.addClass('is-flipped');
				swapArticleClass(back, currentClass);
				setTimeout(function() {
					swapArticleClass(front, nextClass);
				}, speed / 2);
			} else {
				cards.removeClass('is-flipped');
				swapArticleClass(front, currentClass);
				setTimeout(function() {
					swapArticleClass(back, nextClass);
				}, speed / 2);
			}
            this.setState({activeCard: i})
		}, speed * i);
	};

	const cycle = () => {
		for (var i = 1; i <= elements; i++) {
			onTick(i);
            console.log(i);
            this.setState({activeCard: i});
		}
	};

    cycle();
	setInterval(cycle, speed * elements);
}

bfCards(cardAmount, flipSpeed);
    }
     renderCardDetails() {
    const { activeCard } = this.state;
    // Create details for each card, and only display the details for the active card
    const cardDetails = {
      1: <div>RoVolt</div>,
      2: <div>RoCar</div>,
      3: <div>RoPlant</div>,
      4: <div>RoAI</div>,
      5: <div></div>
    //   4: <div>Details for Card 4</div>,
      // Add as many details as you have cards
    };
    
    return cardDetails[activeCard] || <div>No details available</div>;
  }
    render() {
        
        return (
            <>
             <div className="card-layout">
            <div className="cards">
  <div className="cards__container">
    <div className="cards__front card-1" />
    <div className="cards__back card-2" />
  </div>
</div>
 <div className={"card-details" + " "}>
          {this.renderCardDetails()}
        </div>
</div>
<div>

</div>
            </>
        )
    }

}


export default Card;