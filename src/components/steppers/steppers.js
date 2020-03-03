import React, {Fragment, useCallback, useState} from "react";
import {CSSTransition} from "react-transition-group";
import PropTypes from "prop-types";

import {prepareHooksForSteppers} from "../../helpers/prepareHooksForSteppers";

import {Card} from "../card/card";
import {Button} from "../button/button";
import {Overlay} from "../overlay/overlay";

import './steppers.css'
import '../container/absolute.css'

const styles = {width: '100%', margin: '0'};

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

    const setNewStatus = useCallback((prevOrNext, values, card) => {
        if (values) {
            setUserValues({...userValues, [card]: values}) //set new state
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
    }, []);

    const onClickBack = useCallback(() => setNewStatus('prev'), []);

    return <>
        <Overlay visible={visible}/>
        <CSSTransition in={visible}
                       classNames='steppers__cards'
                       timeout={300}
                       appear
                       onExited={() => submit(userValues)}
        >
            <div className='container absolute'>
                <Card headerText='Create a new game'
                      style={styles}
                      render={() => {
                          return <>
                              {hooks.map((hook, index) => {
                                  const Component = components[index].component;
                                  const nameInState = 'card' + (index + 1);
                                  return hook[0] && <Fragment key={index}>
                                      <Component
                                          setNewStatus={setNewStatus}
                                          initial={userValues[nameInState]}
                                          nameInState={nameInState}
                                      />
                                      {!components[index].form
                                      && <Button className='button button_next'
                                                 onClick={() => setNewStatus('next', {}, nameInState)}
                                                 data-testid='button_next'
                                      />}
                                  </Fragment>
                              })
                              }
                          </>
                      }}
                />
                <Button className='button button_back'
                        onClick={onClickBack}
                        data-testid='button_back'/>
            </div>
        </CSSTransition>
    </>
};

Steppers.propTypes = {
    submit: PropTypes.func.isRequired,
    numberOfCards: PropTypes.number.isRequired,
    components: function (props, propName) {
        if (!props[propName]) return new Error(`prop \'${propName}\' is required.`);
        if (!Array.isArray(props[propName])) return new Error(`prop \'${propName}\' must be an Array.`);
        if (props[propName].length !== props['numberOfCards']) return new Error(`prop \'${propName}\' must have ${props['numberOfCards']} components (because of \'numberOfCards\'-prop)`);
        for (let i = 0; i < props[propName].length; i++) {
            const element = props[propName][i];
            if (typeof element !== "object") return new Error(`prop \'${propName}\' must be array of objects.`);
            if (!element.component) return new Error(`Each element in prop \'${propName}\' must have the component field.`);
            if (element.form === undefined) return new Error(`Each element in prop \'${propName}\' must have the form field.`);
            if (typeof element.form !== "boolean") return new Error(`The field \'form\' in prop \'${propName}\' must be a boolean.`);
            if (element.form && !element.initial) return new Error(`If field \'form\' is true, field \'initial\' in prop \'${propName}\' is required`);
        }
    }
};

export default Steppers;