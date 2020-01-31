import React, {Fragment, useState} from "react";
import {CSSTransition} from "react-transition-group";

import {prepareHooksForSteppers} from "../../helpers/prepareHooksForSteppers";

import {Card} from "../card/card";
import {Button} from "../button/button";

import './steppers.css'
import '../container/absolute.css'
import {Overlay} from "../overlay/overlay";
import PropTypes, {number} from "prop-types";

const makeHooks = (number, components) => {
    let hooks = [];
    let initial = {};
    for (let i = 0; i < number; i++) {
        if (i === 0) {
            hooks[i] = useState(true);
            initial['card1'] = components[i].initial;
        } else {
            hooks[i] = useState(false);
            const cardName = 'card' + (i + 1);
            initial[cardName] = components[i].initial;
        }
    }
    return [hooks, initial]
};

const Steppers = ({numberOfCards, components, submit}) => {

    const [visible, setVisible] = useState(true);

    const [hooks, initial] = makeHooks(numberOfCards, components);

    const [userValues, setUserValues] = useState(initial);

    const cards = prepareHooksForSteppers(hooks);

    let currentCard = cards.getCurrent();

    const setNewStatus = (prevOrNext, values, card) => {
        if (values) {
            let obj = {};
            obj[card] = values;
            setUserValues(Object.assign(userValues, obj)) //set new state
        }
        currentCard.data[1](false); // make the current card invisible
        let exit = false;
        if (prevOrNext === 'next') {
            currentCard = currentCard.next || {}
        } else {
            currentCard = currentCard.prev || {};
            exit = true;
        }
        if (currentCard.data) {
            currentCard.data[1](true) // if the next card exists, make it visible
        } else {
            exit && setUserValues(initial);
            setVisible(false);
        }
    };

    return <Fragment>
        <Overlay visible={visible}/>
        <CSSTransition in={visible}
                       classNames='steppers__cards'
                       timeout={300}
                       appear
                       onExited={() => submit(userValues)}
        >
            <div className='container absolute'>
                <Card headerText='Create a new game'
                      style={{width: '100%', margin: '0'}}
                      render={() => {
                          return <Fragment>
                              {hooks.map((hook, index) => {
                                  const Component = components[index].component;
                                  const nameInState = 'card' + (++index);
                                  return hook[0] && <Component key={index}
                                                               setNewStatus={setNewStatus}
                                                               initial={userValues[nameInState]}
                                                               nameInState={nameInState}/>
                              })
                              }
                          </Fragment>
                      }}
                />
                <Button className='button button_back' onClick={() => setNewStatus('prev')}/>
            </div>
        </CSSTransition>
    </Fragment>
};

Steppers.propTypes = {
    submit: PropTypes.func.isRequired,
    numberOfCards: PropTypes.number.isRequired,
    components: function (props, propName) {
        if (!props[propName]) return new Error(`prop \'${propName}\' is required.`);
        if (!Array.isArray(props[propName])) return new Error(`prop \'${propName}\' must be an Array.`);
        if (props[propName].length !== props['numberOfCards']) return new Error(`prop \'${propName}\' must have ${props['numberOfCards']} components (because of \'numberOfCards\'-prop)`)
    }
};

export default Steppers;