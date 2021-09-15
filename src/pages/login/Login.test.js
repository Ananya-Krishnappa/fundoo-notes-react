import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, mount } from "enzyme";
import Login from "../login/Login";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

it("Renders two Input Fields", () => {
    const wrapper = shallow(<Login />);
    const valCount = wrapper.find("h3").length;
    expect(valCount).toBe(1);
});

it("Shallow renders one h5 element with text Sign in", () => {
    const wrapper = shallow(<Login />);
    const h5Text = wrapper.find("h5").text();
    expect(h5Text).toEqual("Sign in");
});

it("Shallow renders one login form container", () => {
    const wrapper = shallow(<Login />);
    const count = wrapper.find("div.login-form-container").length
    expect(count).toBe(1);
});
