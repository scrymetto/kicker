import React from "react";
import sinon from "sinon";

import axiosMock from "../__mocks__/axios";
import {getRooms} from "../src/helpers/requests/getRooms";

describe('getRooms()', () => {
    const resolvedData = {
        rooms: [
            {name: 'Gryffindor', players: ['Harry', 'Ron', 'Hermione'], admin: 'Harry'},
            {name: 'Slytherin', players: ['Tom', 'Draco'], admin: 'Tom'}
        ],
    };
    const user = {
        email: 'dumbledore@hogwarts.com',
        password: 'red_phoenix99'
    };
    const errorMessage = {message: 'Voldemort wins'};
    let onError, onSuccess;
    beforeEach(() => {
        sinon.reset();
        onError = sinon.spy();
        onSuccess = sinon.spy()
    });
    it('should return rooms if status OK', async () => {
        axiosMock.get.resolves({data: resolvedData, status: 200});
        let rooms = await getRooms(user, onSuccess, onError);
        expect(rooms).to.be.equal(resolvedData);
        expect((axiosMock.get).calledOnce).to.equal(true);
        expect(onSuccess.calledOnce).to.equal(true);
        expect(onSuccess.calledWith({username:user.email, password: user.password})).to.equal(true);
        expect(onError.calledOnce).to.equal(false);
    });
    it('should trow exception if server status is OK, BUT there is an error', async () => {
        axiosMock.get.throws(errorMessage);
        await getRooms(user, onSuccess, onError);
        expect((axiosMock.get).calledOnce).to.equal(true);
        expect(onSuccess.calledOnce).to.equal(false);
        expect(onError.calledOnce).to.equal(true);
        expect(onError.calledWith(errorMessage.message)).to.equal(true);
    });
    it('should call error function if server status is NOT OK', async () => {
        axiosMock.get.resolves({resolvedData, status: 400});
        let rooms = await getRooms(user, onSuccess, onError);
        expect((axiosMock.get).calledOnce).to.equal(true);
        expect(onSuccess.calledOnce).to.equal(false);
        expect(onError.calledOnce).to.equal(true);
        expect(onError.calledWith(400)).to.equal(true);
    });
});