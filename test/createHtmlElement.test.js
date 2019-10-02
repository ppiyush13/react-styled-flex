import '@testing-library/jest-dom/extend-expect';
import createHtmlElement from '../src/createHtmlElement';

describe('unit testing assignStyle function within createHtmlElement module', () => {
    const assignStyle = createHtmlElement.__get__('assignStyle');
    it.each([
        [{ height: '50px' }, 'height: 50px;'],
        [{}, ''],
        [{ invalidStyle: '15px' }, ''],
        [{ invalidStyle: '15px', justifyContent: 'center', display: 'flex' }, 'display:flex;justify-content: center;'],
        [null, ''],
        [[], ''],
        [undefined, ''],
        ['true', ''],
        [Symbol(5), ''],
        [NaN, ''],
        [function noop() {}, ''],
    ])('Expect %o to assign style as %s', (styleObj, expected) => {
        const div = document.createElement('div');
        assignStyle(div, styleObj);
        expect(div).toHaveStyle(expected);
    });
});

describe('testing createElements module\'s positive scenarios', () => {
    it('Test with simple json', () => {
        const htmlDom = createHtmlElement({
            style: {
                display: 'inline-block',
                height: '50px',
            },
            content: '45',
        });

        const child = htmlDom.children[0];
        expect(htmlDom.childElementCount).toEqual(1);
        expect(child.tagName).toEqual('DIV'); // Be default expected to be div
        expect(child).toHaveStyle('display:inline-block;height:50px');
        expect(child).toHaveTextContent(45);
        expect(child.attributes.length).toEqual(1);
    });

    it('Test with uppercase tag name', () => {
        const htmlDom = createHtmlElement({
            tag: 'SPAN',
            id: 'myId',
            style: {
                display: 'inline-block',
                height: '50px',
            },
            content: 'dummy content',
        });

        const child = htmlDom.children[0];
        expect(htmlDom.childElementCount).toEqual(1);
        expect(child.tagName).toEqual('SPAN');
        expect(child).toHaveStyle('display:inline-block;height:50px');
        expect(child).toHaveAttribute('id', 'myId');
        expect(child).toHaveTextContent('dummy content');
        expect(child.attributes.length).toEqual(2);
    });

    it('Test with one child div', () => {
        const htmlDom = createHtmlElement({
            tag: 'div',
            content: {
                tag: 'span',
                class: 'enabled some more',
                style: {
                    height: '50px',
                },
                content: 'Inner content',
                'aria-label': 'child of div',
            },
        });

        const parent = htmlDom.children[0];
        expect(htmlDom.childElementCount).toEqual(1);
        expect(parent.tagName).toEqual('DIV');
        expect(parent.attributes.length).toEqual(0);

        const child = parent.children[0];
        expect(child.tagName).toEqual('SPAN');
        expect(child).toHaveStyle('height:50px');
        expect(child).toHaveClass('some', 'more', 'enabled');
        expect(child).toHaveAttribute('aria-label', 'child of div');
        expect(child).toHaveTextContent('Inner content');
        expect(child.attributes.length).toEqual(3);
    });

    it('Test with three childs of fragments', () => {
        const htmlDom = createHtmlElement([
            {
                tag: 'div',
                style: {
                    color: '#FFF',
                },
                content: 'child 1',
            },
            {
                tag: 'span',
                id: 'second-child',
                content: 'child 2',
            },
            {
                tag: 'div',
                style: {
                    height: '50px',
                    width: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: [
                    {
                        tag: 'span',
                        content: 'centered',
                    },
                ],
            },
        ]);

        expect(htmlDom.childElementCount).toEqual(3);

        const child1 = htmlDom.children[0];
        expect(child1.tagName).toEqual('DIV');
        expect(child1).toHaveStyle('color: #fff');
        expect(child1).toHaveTextContent('child 1');
        expect(child1.attributes.length).toEqual(1);

        const child2 = htmlDom.children[1];
        expect(child2.tagName).toEqual('SPAN');
        expect(child2).toHaveAttribute('id', 'second-child');
        expect(child2).toHaveTextContent('child 2');
        expect(child2.attributes.length).toEqual(1);

        const child3 = htmlDom.children[2];
        expect(child3.tagName).toEqual('DIV');
        expect(child3).toHaveStyle('ALIGN-ITEMS:center;display:flex;height:50px;width:100px;justify-content:center');
        expect(child3.attributes.length).toEqual(1);

        const child3InnerChild = child3.children[0];
        expect(child3InnerChild.tagName).toEqual('SPAN');
        expect(child3InnerChild).toHaveTextContent('centered');
        expect(child3InnerChild.attributes.length).toEqual(0);
    });
});

describe('testing createElements with non array input values', () => {
    it.each([
        [[]],
        [null],
        [undefined],
        [false],
        [NaN],
        [0],
        [''],
        [function noop() {}],
    ])('Input: %p ; Expected: %p', input => {
        expect(createHtmlElement(input).childElementCount).toEqual(0);
    });
});

describe('testing createElements : negative scenarios', () => {
    it('testing with invalid attrs', () => {
        const htmlDom = createHtmlElement({
            0: 'some content',
            '*data': 'some',
        });
        expect(htmlDom.children[0].attributes.length).toEqual(0);
    });

    it('testing with null content', () => {
        const htmlDom = createHtmlElement({
            content: null,
        });
        expect(htmlDom.children[0].childElementCount).toEqual(0);
    });

    it('testing with empty object', () => {
        const htmlDom = createHtmlElement({});
        const child = htmlDom.children[0];
        expect(htmlDom.childElementCount).toEqual(1);
        expect(child.tagName).toEqual('DIV');
        expect(child.attributes.length).toEqual(0);
    });
});
