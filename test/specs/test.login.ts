import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'

describe('Login Functionality', () => {
    it('TC-001 verify if login page is visible correctly', async () => {
        await LoginPage.open();

        await expect(LoginPage.titlePage).toBeDisplayed();
        await expect(LoginPage.titlePage).toHaveText('Swag Labs');

        await expect(LoginPage.btnSubmit).toBeDisplayed();
        await expect(LoginPage.btnSubmit).toHaveValue('Login');
    })

    it('TC-002 verify if username option is functional', async () => {
        await LoginPage.open();

        await expect(LoginPage.inputUsername).toBeDisplayed();
        await LoginPage.inputUsername.setValue('standard_user');
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
    })

    it('TC-003 verify if password option is functional', async () => {
        await LoginPage.open();

        await expect(LoginPage.inputPassword).toBeDisplayed();
        await LoginPage.inputPassword.setValue('secret_sauce');
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
    })

    it('TC-004 verify user can login with correct credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory'));
    })

    it('TC-005 verify the error message for correct user name but wrong password', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'wrong_password');
        await expect (LoginPage.errMessage).toBeDisplayed();
        
        const errMessage = await LoginPage.errMessage.getText();
        await expect(errMessage).toContain('Username and password do not match any user in this service');
    })

    it('TC-006 verify the error message for wrong user name but correct password', async () => {
        await LoginPage.open();

        await LoginPage.login('wrong_username', 'secret_sauce');
        await expect (LoginPage.errMessage).toBeDisplayed();
        
        const errMessage = await LoginPage.errMessage.getText();
        await expect(errMessage).toContain('Username and password do not match any user in this service');
    })

    it('TC-007 verify if the error message pops up for username required', async () => {
        await LoginPage.open();

        await LoginPage.login('', 'secret_sauce');
        await expect (LoginPage.errMessage).toBeDisplayed();
        
        const errMessage = await LoginPage.errMessage.getText();
        await expect(errMessage).toContain('Username is required');
    })

    it('TC-008 verify if the error message pops up for password required', async () => {
        await LoginPage.open();

        await LoginPage.login('wrong_username', '');
        await expect (LoginPage.errMessage).toBeDisplayed();
        
        const errMessage = await LoginPage.errMessage.getText();
        await expect(errMessage).toContain('Password is required');
    })
})
