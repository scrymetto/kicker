import axiosMock from "../__mocks__/axios";
import {submitNewUserForm} from "../src/helpers/requests/submitNewUserForm";
import sinon from "sinon";

describe('Function sendRequest', () => {
    let url = 'https://The_hitchhikers_guide_to_the_Galaxy.com';
    let data = {
        login: 'Deep Thought',
        password: '42'
    };
    let resolvedData = {
        allYouNeed: 'towel'
    };
    const errorMessage = {message: 'Don\'t panic!'};
    let fn;
    let fnError;
    beforeEach(() => {
        sinon.reset();
        fn = sinon.spy();
        fnError = sinon.spy();
    });
    it('should call success function if server status is OK', async () => {
        axiosMock.post.resolves({data: resolvedData, status: 200});
        await submitNewUserForm(data, url, fn, fnError);
        expect((axiosMock.post).resolvesArg(0).calledOnce).to.equal(true);
        expect(fn.calledOnce).to.equal(true);
        expect(fn.calledWith(resolvedData)).to.equal(true);
        expect(fnError.calledOnce).to.equal(false)
    });
    it('should trow exception if server status is OK, BUT there is an error', async () => {
        axiosMock.post.throws(errorMessage);
        await submitNewUserForm(data, url, fn, fnError);
        expect((axiosMock.post).resolvesArg(1).calledOnce).to.equal(true);
        expect(fn.calledOnce).to.equal(false);
        expect(fnError.calledOnce).to.equal(true);
        expect(fnError.calledWith(errorMessage.message)).to.equal(true);
    });
    it('should call error function if server status is NOT OK', async () => {
        axiosMock.post.resolves({resolvedData, status: 400});
        await submitNewUserForm(data, url, fn, fnError);
        expect((axiosMock.post).resolvesArg(0).calledOnce).to.equal(true);
        expect(fn.calledOnce).to.equal(false);
        expect(fnError.calledOnce).to.equal(true);
        expect(fnError.calledWith(400)).to.equal(true);
    });
});
