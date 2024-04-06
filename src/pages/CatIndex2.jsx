import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import "../App.css"
import NavButton from '../components/NavButton';



const Advanced = ({ onClick, cats }) => {
  const [currentIndex, setCurrentIndex] = useState(cats.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [showFront, setShowFront] = useState(true);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(cats.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < cats.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='index-page'>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1 className='index-header'>Perrfect Match</h1>
            {cats.map((cat, index) => (
              <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={cat.name}
                onSwipe={(dir) => swiped(dir, cat.name, index)}
                onCardLeftScreen={() => outOfFrame(cat.name, index)}
                >
      <div className='flip-card-container'>
      <div className='flip-card'>
        <div className='flip-card-inner'>
                  <div className='flip-card-back'>
                <ul className='flip-card-back-ul'>
                    <li><h3>{cat.name}</h3></li>
                    <li><h4>Age: {cat.age}</h4></li>
                    <li><p>Enjoys: {cat.enjoys}</p></li>
                    <li><NavButton className= "flip-card-button"
                    url={`/cat-show/${cat.id}`}
              buttonContent="Adopt Me" /></li>
                </ul>
                </div>
                <div
                style={{ backgroundImage: 'url(' + cat.image + ')' }}
                className='flip-card-front card'
                >
                <h3>{cat.name}</h3>
                </div>
        </div>
      </div>
        </div>
            </TinderCard>
            ))}
        <div className='buttons'>
            <button style={{ backgroundColor: !canSwipe && '#f51955' }} onClick={() => swipe('left')}>Swipe left!</button>
            <button style={{ backgroundColor: !canGoBack && '#f55477' }} onClick={() => goBack()}>Undo swipe!</button>
            <button style={{ backgroundColor: !canSwipe && '#f51955' }} onClick={() => swipe('right')}>Swipe right!</button>
        </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button!
        </h2>
      )}
    </div>
  )
}

export default Advanced