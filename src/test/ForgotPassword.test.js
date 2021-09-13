import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, mount } from "enzyme";
import ForgotPassword from "../pages/ForgotPassword";

Enzyme.configure({ adapter: new Adapter() });

it("Renders two Input Fields", () => {
    const wrapper = shallow(<ForgotPassword />);
    const valCount = wrapper.find("h3").length;
    expect(valCount).toBe(1);
});

it("Shallow renders one h5 element with text Account recovery", () => {
    const wrapper = shallow(<ForgotPassword />);
    const h5Text = wrapper.find("h5").text();
    expect(h5Text).toEqual("Account recovery");
});

it("Shallow renders one forgot password form container", () => {
    const wrapper = shallow(<ForgotPassword />);
    const count = wrapper.find("div.register-form").length
    expect(count).toBe(1);
});