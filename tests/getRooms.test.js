import axiosMock from "../__mocks__/axios";
import {getRooms} from "../src/helpers/requests/getRooms";
import sinon from "sinon";

describe('getRooms()', () => {
    const resolvedData = {
        rooms: [
            {name: 'Gryffindor', players: ['Harry', 'Ron', 'Hermione'], admin: 'Harry'},
            {name: 'Slytherin', players: ['Tom', 'Draco'], admin:'Tom'}
            ],
    };
    let onError;
    beforeEach(()=>{
        onError = sinon.spy();
    });
    it('should return rooms if status OK', async () => {
        axiosMock.get.mockResolvedValue({data: resolvedData, status: 200});
        let rooms = await getRooms(onError);
        console.log(rooms)
        expect(rooms).to.be.equal(resolvedData)
    });
});