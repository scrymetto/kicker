import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, render} from 'enzyme';
import {JSDOM} from 'jsdom';
import {expect} from 'chai';

import {AuthContext} from "../src/helpers/auth&route/authContext";

const {window} = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.shallow = shallow;
global.mount = mount;
global.render = render;
configure({adapter: new Adapter()});
global.expect = expect;

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock;

const contextWithUser = {
    user: {login: 'Dumbledore', password: 'red_phoenix99'},
    setLoginAndPassword: function (s) {
        this.user = s
    }
};
const contextWithoutUser = {
    user: {login: undefined, password: undefined},
    setLoginAndPassword: function (s) {
        this.user = s
    }
};

export const Context = (props) => {
    return <AuthContext.Provider value={contextWithUser}>{props.children}</AuthContext.Provider>
};

export const EmptyContext = (props) => {
    return <AuthContext.Provider value={contextWithoutUser}>{props.children}</AuthContext.Provider>
};