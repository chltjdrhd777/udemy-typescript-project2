//autobind decorator
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // in method decorator, value contain original method.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this); // Then, autoBind would attach bind(this) which allows the target method to act in the boundary of the same area it is involved.
      return boundFn;
    }
  };
  return adjDescriptor;
}

//Input section
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement; //access to the input template and save this in templateElement property. "!" mark I put because I know it is not a null
    this.hostElement = document.getElementById("app")! as HTMLDivElement; // access to the div with id "app". and again, I put "!" because it is not null and "as HTMLDivElement" because it is div element

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //importNode() allows me to import all things which exist in another document and value "true" means I want to get the whole contents
    this.element = importedNode.firstElementChild as HTMLFormElement; //firstElementChild allows me to get the fisrt content inside the importedNode. In this case, it is "<form>"
    this.element.id = "user-input"; // In css, I make codes to decorate the boundary of input place. Therefore, I add id into element.

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement; // in constant "element", I can find something which has an ID "title" and populate it in titleInputElement
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach(); // after instanciation of class ProjectInput, the function "attach()" would be run automatically.
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler); // if I submit something, submitHandler would get started. But, if I send anything in submitHandler, Then, for it, "this" doesn't mean the class. So, I could add .bind/ but in this case, I would aplly decorator.
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element); // insertAdjacentElement('where' , what). the landmark is hostElement(about where) // Initianlly, I want to get the first content of "importedNode" but it is in a constructor so I made additional route
  }
}

const prjInput = new ProjectInput();
