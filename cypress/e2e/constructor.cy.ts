const firstBun = '[data-ingredient="bun"]:first-of-type';
const modals = '#modals';


describe('E2E тест конструктора бургеров', () => { 
  beforeEach(() => { 
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }); 
    cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

    // Перехват запросов на проверку авторизации, оформление заказа и получения ингредиентов
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000/'); 
  }); 

  describe('Протестирована работа модальных окон', () => { 
      it('открытие модального окна ингредиента', () => { 
        cy.get(firstBun).click(); 
        cy.get(modals).children().should('have.length', 2).and('be.visible'); 
      }); 

  }); 
    it('закрытие по клику на крестик', () => { 
      cy.get(firstBun).click(); 
      cy.get('#modals button:first-of-type').click(); 
      cy.get(modals).children().should('have.length', 0); 
    }); 
});
