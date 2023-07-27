//import necessary modules
import React from'react';
import { shallow } from 'enzyme';
import LandingPageCard from './landingpage';
import LandingPage from './landingpage';

describe('LandingPageCard_function', () => {

    // Tests that the component is rendered with correct props
    it('test_happy_path_render_component', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading',
            path: '/test'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find('.page-card')).toHaveLength(1);
    });

    // Tests that the image is rendered with correct src and alt text
    it('test_happy_path_render_image', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading',
            path: '/test'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find('.card-image').prop('src')).toEqual('test.png');
        expect(wrapper.find('.card-image').prop('alt')).toEqual('Test');
    });

    // Tests that the heading is rendered with correct text
    it('test_happy_path_render_heading', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading',
            path: '/test'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find('.card-heading').text()).toEqual('Test Heading');
    });

    // Tests that the Link component is rendered with correct path prop
    it('test_happy_path_render_link', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading',
            path: '/test'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find(Link).prop('to')).toEqual('/test');
    });

    // Tests that the button is rendered with correct text
    it('test_happy_path_render_button', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading',
            path: '/test'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find('.login-button').text()).toEqual('Login');
    });

    // Tests that the component handles missing props correctly
    it('test_edge_case_missing_prop', () => {
        // Arrange
        const props = {
            imageSrc: 'test.png',
            altText: 'Test',
            heading: 'Test Heading'
        };

        // Act
        const wrapper = shallow(<LandingPageCard {...props} />);

        // Assert
        expect(wrapper.find('.page-card')).toHaveLength(1);
        expect(wrapper.find('.card-image').prop('src')).toEqual('test.png');
        expect(wrapper.find('.card-image').prop('alt')).toEqual('Test');
        expect(wrapper.find('.card-heading').text()).toEqual('Test Heading');
        expect(wrapper.find(Link)).toHaveLength(0);
        expect(wrapper.find('.login-button')).toHaveLength(0);
    });

    // Tests that the function throws an error when the imageSrc prop is not a string
    it('test_imageSrc_not_string', () => {
        expect(() => {
            render(<LandingPageCard imageSrc={1} altText="Tenant" heading="Tenant Account" path="/tenantlogin" />);
        }).toThrow();
    });

    // Tests that the LandingPageCard function throws an error when the altText prop is not a string
    it('test_altText_prop_not_string', () => {
        expect(() => {
            render(<LandingPageCard imageSrc="image.png" altText={123} heading="Heading" path="/path" />);
        }).toThrow();
    });

    // Tests that the LandingPageCard function throws an error when the heading prop is not a string
    it('test_heading_prop_not_string', () => {
        expect(() => {
            render(<LandingPageCard imageSrc="tenantLandingPageimg.png" altText="Tenant" heading={123} path="/tenantlogin" />);
        }).toThrow();
    });

    // Tests that the LandingPageCard function throws an error when the path prop is not a string
    it('test_path_prop_not_string', () => {
        expect(() => {
            render(<LandingPageCard imageSrc="tenantLandingPageimg.png" altText="Tenant" heading="Tenant Account" path={123} />);
        }).toThrow();
    });

    // Tests that the button has a hover effect
    it('test_button_hover_effect', () => {
        // Arrange
        const wrapper = shallow(<LandingPageCard imageSrc="tenantLandingPageimg.png" altText="Tenant" heading="Tenant Account" path="/tenantlogin" />);
        const button = wrapper.find('.login-button');

        // Act
        button.simulate('mouseenter');

        // Assert
        expect(button.hasClass('hover-effect')).toBe(true);
    });

    // Tests that the button has a focus effect
    it('test_button_focus_effect', () => {
        // Arrange
        const wrapper = shallow(<LandingPageCard imageSrc="tenantLandingPageimg.png" altText="Tenant" heading="Tenant Account" path="/tenantlogin" />);
        const button = wrapper.find('.login-button');

        // Act
        button.simulate('focus');

        // Assert
        expect(button.hasClass('focus-effect')).toBe(true);
    });

    // Tests that the button in LandingPageCard has an accessible label
    it('button_has_accessible_label', () => {
        // Arrange
        const imageSrc = 'testImage.png';
        const altText = 'Test Image';
        const heading = 'Test Heading';
        const path = '/test';

        // Act
        const wrapper = shallow(<LandingPageCard imageSrc={imageSrc} altText={altText} heading={heading} path={path} />);

        // Assert
        expect(wrapper.find('.login-button').prop('aria-label')).toBe('Login');
    });

    // Tests that the button has an active effect
    it('test_button_active_effect', () => {
        // Arrange
        const imageSrc = 'testImage.png';
        const altText = 'Test Image';
        const heading = 'Test Heading';
        const path = '/test';

        // Act
        const wrapper = shallow(<LandingPageCard imageSrc={imageSrc} altText={altText} heading={heading} path={path} />);

        // Assert
        expect(wrapper.find('.login-button').hasClass('active')).toBe(false);

        // Act
        wrapper.find('.login-button').simulate('mousedown');

        // Assert
        expect(wrapper.find('.login-button').hasClass('active')).toBe(true);

        // Act
        wrapper.find('.login-button').simulate('mouseup');

        // Assert
        expect(wrapper.find('.login-button').hasClass('active')).toBe(false);
    });
});



describe('LandingPage_function', () => {

    // Tests that three cards are rendered with correct image, alt text, heading and path
    it('test_happy_path_render_cards', () => {
        // Test code

    })

    // Tests that cards are rendered with empty imageSrc, altText, heading and path
    it('test_edge_case_render_empty_cards', () => {
        // Test code
    })

    // Tests that cards are rendered with invalid path
    it('test_general_behaviour_render_invalid_path', () => {
        // Test code
    })

    // Tests that cards are rendered with missing imageSrc, altText, heading or path
    it('test_general_behaviour_render_missing_data', () => {
        // Test code
    })

    // Tests that cards are rendered with long heading
    it('test_edge_case_render_long_heading', () => {
        // Test code
    })

    // Tests that clicking on Login button redirects to correct path
    it('test_happy_path_click_login_button', () => {
        // Test code
    })
});

