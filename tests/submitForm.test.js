import axiosMock from "../__mocks__/axios";
import {submitForm} from "../src/helpers/submitForm";
import sinon from "sinon";

describe('Function sendRequest', () => {
    let url = 'https://blabla.com';
    let data = {
        login: 'God',
        password: '42'
    };
    let fn;
    let fnError;
    beforeEach(() => {
        fn = sinon.spy();
        fnError = sinon.spy();
    });
    it('should call success function if server status is OK', async () => {
        axiosMock.get.mockResolvedValue({data: {title: 'some title'}, status: 200});
        await submitForm(data, url, fn, fnError);
        console.log('then works');
        expect(fn.calledOnce).to.equal(true);
        expect(fnError.calledOnce).to.equal(false)
    });
    it('should call error function if server status is NOT OK', async () => {
        axiosMock.get.mockResolvedValue({data: {title: 'some title'}, status: 400});
        await submitForm(data, url, fn, fnError);
        console.log('then works');
        expect(fn.calledOnce).to.equal(false);
        expect(fnError.calledOnce).to.equal(true)
    });
});
