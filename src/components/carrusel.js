import React, { useEffect, useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const items = [
  {
    src: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9ycmUlMjBlaWZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9ycmUlMjBlaWZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://images.unsplash.com/photo-1562243885-2541f1032824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9ycmUlMjBlaWZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const Example = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {id} =useParams();

  useEffect(() =>{
    const url = `http://localhost:3005/atracciones/${id}`
    const getdetalles = async () =>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
  })
  const next = () => {
    if (activeIndex === items.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const previous = () => {
    if (activeIndex === 0) {
      setActiveIndex(items.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => (
    <CarouselItem
      key={index}
      onExiting={() => {}}
      onExited={() => {}}
    >
      <img src={item.src} alt={item.altText} width="100%" height="720px" />
      <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
    </CarouselItem>
  ));

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default Example;
