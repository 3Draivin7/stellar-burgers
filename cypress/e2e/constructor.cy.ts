const firstBun = '[data-ingredient="bun"]:first-of-type';
const modals = '#modals';
const buns = '[data-cy="1"]';
const main = '[data-cy="2"]';
const sause = '[data-cy="3"]';

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

    describe('Создание заказа', () => {
      beforeEach(() => {
          // Устанавливаем моковые данные для запросов
          cy.intercept('GET', '/api/user', { fixture: 'user.json' }).as('getUser');
          cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  
          // Посещаем страницу конструктора
      });
  
      it('должен успешно создать заказ и показать правильный номер заказа', () => {
          // Подставляем токены авторизации
          localStorage.setItem('authToken', 'mockAuthToken');
  
          // Собираем бургер
          cy.get(buns).children('button').click();  // Выбор булки
          cy.get(main).children('button').click();  // Выбор начинки
          cy.get(sause).children('button').click();  // Выбор соуса
          // Кликаем по кнопке "Оформить заказ"
          console.log('[data-testid="constructor"]')
          cy.get('[data-testid="order-button"]').click();
          console.log('[data-testid="constructor"]')
          // Проверяем, что модальное окно открылось
          cy.get('[data-testid="order-modal"]').should('be.visible');
  
          // Проверяем, что номер заказа верный
          cy.get('[data-testid="order-modal"]').should('contain', '38321');  // Используем номер заказа из вашего объекта
  
          // Закрываем модальное окно
          cy.get('[data-testid="close-modal-button"]').click();
          
          // Проверяем успешность закрытия
          cy.get('[data-testid="order-modal"]').should('not.exist');
  
          // Проверяем, что конструктор пуст
         /* cy.wait(1000); // Увеличьте время, если необходимо
          cy.get('[data-testid="constructor"]').children().should('have.length', 0);*/
          cy.get('[data-testid="order-button"]').should('be.disabled');
      });
  });
})