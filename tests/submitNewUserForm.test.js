import axiosMock from "../__mocks__/axios";
import {submitNewUserForm} from "../src/helpers/requests/submitNewUserForm";
import sinon from "sinon";

describe('Function sendRequest', () => {
    let url = 'https://blabla.com';
    let data = {
        login: 'God',
        password: '42'
    };
    let resolvedData = {
       title: 'some title'
    };
    let fn;
    let fnError;
    beforeEach(() => {
        fn = sinon.spy();
        fnError = sinon.spy();
    });
    it('should call success function if server status is OK', async () => {
        axiosMock.post.mockResolvedValue({data: resolvedData, status: 200});
        await submitNewUserForm(data, url, fn, fnError);
        expect(fn.calledOnce).to.equal(true);
        expect(fn.calledWith(resolvedData)).to.equal(true);
        expect(fnError.calledOnce).to.equal(false)
    });
    it('should call error function if server status is NOT OK', async () => {
        axiosMock.post.mockResolvedValue({resolvedData, status: 400});
        await submitNewUserForm(data, url, fn, fnError);
        expect(fn.calledOnce).to.equal(false);
        expect(fnError.calledOnce).to.equal(true)
        expect(fnError.calledWith(400)).to.equal(true);

    });
});
