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
        username: 'dumbledore@hogwarts.com',
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
        let rooms;
        await getRooms(user)
            .then(data => {
                rooms = data;
                onSuccess(data);
            })
            .catch((e)=>{
                onError(e)
            });
        expect(rooms).to.be.equal(resolvedData);
        expect((axiosMock.get).calledOnce).to.equal(true);
        expect(onSuccess.calledOnce).to.equal(true);
        expect(onSuccess.calledWith(resolvedData)).to.equal(true);
        expect(onError.calledOnce).to.equal(false);
    });
    it('should trow exception if server status is OK, BUT there is an error', async () => {
        axiosMock.get.throws(errorMessage);
        await getRooms(user)
            .then(data => {
                onSuccess(data);
            })
            .catch((e)=>{
                onError(e.message)
            });
        expect((axiosMock.get).calledOnce).to.equal(true);
        expect(onSuccess.calledOnce).to.equal(false);
        expect(onError.calledOnce).to.equal(true);
        expect(onError.calledWith(errorMessage.message)).to.equal(true);
    });
});