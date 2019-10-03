import axiosMock from "../__mocks__/axios";
import {sendRequest} from "../src/helpers/sendRequest";

describe('Function sendRequest', () => {
    axiosMock.get.mockResolvedValue({data: { title: 'some title' } })
    let url = 'https://blabla.com';
    let data = {
        login:'God',
        password: '42'
    };
    let fn = (answer)=> answer;
    let fnError = (e)=> e.message;
    let serverAnswer = sendRequest(data, 'GET', url, fn, fnError);
    expect(serverAnswer).to.be.equal({data: { title: 'some title' } })
});
