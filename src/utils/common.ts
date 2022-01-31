export function format(number: number): string {
  return `$${new Intl.NumberFormat().format(number)}`
}

export function getAccount(): any {
  return JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts') as string)
}

export function getCartListOfAccounts(): any {
  return JSON.parse(localStorage.getItem('firebaseui::rememberedCartListAccounts') as string)
}

export function setAccount(newValues: any): any {
  return localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(newValues))
}

export function setCartListOfAccounts(newValues: any): any {
  return localStorage.setItem('firebaseui::rememberedCartListAccounts', JSON.stringify(newValues))
}
