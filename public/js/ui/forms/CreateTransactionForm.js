/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const data = User.current();

    if (data) {
      Account.list(data, (err, response) => {
        if (response.success) {
          const select = this.element.querySelector("select");
          select.innerHTML = response.data.reduce(
            (acc, element) =>
              acc + `<option value="${element.id}">${element.name}</option>`,
            ""
          );
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
        App.update();
        this.element.reset();
      }
    });
  }
}
