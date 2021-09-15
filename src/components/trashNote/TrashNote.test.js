import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, mount } from "enzyme";
import TrashNote from "./TrashNote";
import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import * as apis from "../services/Api";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

Enzyme.configure({ adapter: new Adapter() });

it("Fully Renders one trash note container", () => {
    const wrapper = mount(<TrashNote />);
    const noteListContainer = wrapper.find("div.note-list-container").length;
    expect(noteListContainer).toBe(1);
});

