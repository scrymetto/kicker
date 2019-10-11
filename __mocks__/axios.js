import sinon from "sinon";

export default {
    get: sinon.stub().returns(Promise),
    post: sinon.stub().returns(Promise)
};
