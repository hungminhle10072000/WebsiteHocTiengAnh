import React, { Component } from "react";
import Slider from "react-slick";
import TopicVocabularyNew from "../TopicVocabularyNew/TopicVocabularyNew";
import './SlideSwipper.css';

export default class SliderSwipper extends Component {
  render() {
    const listTopicNews = this.props.dataTopicsNew
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      swipeToSlide: true,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };
    return (
      <div>
        <Slider {...settings} className='div-slide-swipper' >
            {
              listTopicNews != null 
              &&
              listTopicNews.map((topic, index) => {
                return (
                  <TopicVocabularyNew 
                        key = {index}
                        id={topic.id}
                        name={topic.name}
                        image={topic.image}
                  />
                )
              })
            }
        </Slider>
      </div>
    );
  }
}
