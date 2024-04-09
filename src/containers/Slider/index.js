import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'
// getMonth a été modifié (de 1 à 12 => 0 à 11)

import './style.scss'

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  )
  // inverser 1 et -1 pour que ce soit trier du plus ancien au plus récent
  const nextCard = () => {
    setTimeout(() => {
      if (byDateDesc) {
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)
      } else {
        setIndex(0)
      }
    }, 5000)
  }
  // on assure que "byDateDesc" est défini pour ne pas avoir erreur
  // "Uncaught TypeError: Cannot read properties of undefined (reading 'length')"
  // au premier défilement sur le slider
  // ajout de "-1" "byDateDesc.length - 1 ?" pour enlever l'image blanche
  useEffect(() => {
    nextCard()
  })
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`div${idx}`}>
          {/* le reactFragment '<>' devait prendre un attibrut 'key' */}
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`slide${idx}`}
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={radioIdx}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => {}}
                />
                // attributs key et input modifiés pour que les dots fonctionnent
                // added an empty on change function to remove error on console
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Slider
