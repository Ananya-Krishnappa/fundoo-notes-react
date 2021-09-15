import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, mount } from "enzyme";
import Register from "../register/Register";

Enzyme.configure({ adapter: new Adapter() });

it("Renders two Input Fields", () => {
    const wrapper = shallow(<Register />);
    const valCount = wrapper.find("h3").length;
    expect(valCount).toBe(1);
});

it("Shallow renders one h5 element with text", () => {
    const wrapper = shallow(<Register />);
    const h5Text = wrapper.find("h5").text();
    expect(h5Text).toEqual("Create your Fundoo Notes Account");
});

it("Shallow renders one register form container", () => {
    const wrapper = shallow(<Register />);
    const count = wrapper.find("div.register-form").length
    expect(count).toBe(1);
});