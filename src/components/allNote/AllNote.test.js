import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, mount } from "enzyme";
import AllNote from "./AllNote";
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

it("Fully Renders one create note container", () => {
    const wrapper = mount(<AllNote />);
    const createNoteContainer = wrapper.find("div.create-note-container").length;
    expect(createNoteContainer).toBe(1);
});

// it("renders notes for selected label", async () => {
//     const fakeNote = [
//         {
//             labels: [
//                 {
//                     _id: "613a6d40a84d43042c64e53c",
//                     labelName: "label6",
//                     createdAt: "2021-09-09T20:23:28.928Z",
//                     updatedAt: "2021-09-09T20:23:28.928Z",
//                     checked: true
//                 }
//             ],
//             isPinned: false,
//             isArchived: false,
//             isTrashed: true,
//             _id: "613588151ee62055200ded4c",
//             title: "849",
//             description: "hello",
//             userId: "61318f81885a960f6ca9f14d",
//             createdAt: "2021-09-06T03:16:37.992Z",
//             updatedAt: "2021-09-11T02:34:50.148Z"
//         }
//     ]
//     jest.spyOn(apis, "findAllNotes").mockImplementation(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(fakeNote)
//         })
//     );

//     // Use the asynchronous version of act to apply resolved promises
//     await act(async () => {
//         render(<AllNote routeLabel="all" />, container);
//     });
//     const title = fakeNote[0].title;
//     expect(container.textContent).toContain(title);

//     // remove the mock to ensure tests are completely isolated
//     apis.findAllNotes().mockRestore();
// });