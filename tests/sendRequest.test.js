import axiosMock from "../__mocks__/axios";
import {submitForm} from "../src/helpers/submitForm";
import sinon from "sinon";

describe('Function sendRequest', () => {
    axiosMock.get.mockResolvedValue({data: {title: 'some title'}, status: 200})
    let url = 'https://blabla.com';
    let data = {
        login: 'God',
        password: '42'
    };
    let fn = sinon.spy();
    let fnError = sinon.spy();
    submitForm(data, url, fn, fnError);
    expect(fn.calledOnce).to.equal(true)
    expect(fnError.calledOnce).to.equal(false)
});
