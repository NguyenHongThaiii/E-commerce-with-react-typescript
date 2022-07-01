import { db } from 'App'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from 'firebase/firestore'

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

export async function handleGetItemFromFB(
  id: string | unknown,
  userID: string | unknown,
  nameColl: string
): Promise<DocumentData> {
  const colRef = collection(db, nameColl)
  const q = query(colRef, where('id', '==', id), where('userID', '==', userID))
  const querySnapshot = await getDocs(q)
  return querySnapshot
}

export async function handleRemoveCartItem(
  id: string | unknown,
  userID: string | unknown,
  nameColl: string
): Promise<void> {
  const querySnapshot = await handleGetItemFromFB(id, userID, nameColl)
  const colRefDelete = doc(db, nameColl, querySnapshot.docs[0].id)
  await deleteDoc(colRefDelete)
}

export async function handleSetQuantityFB(
  id: string | unknown,
  userID: string | unknown,
  nameColl: string,
  quantity: number
): Promise<void> {
  const querySnapshot = await handleGetItemFromFB(id, userID, nameColl)

  const colRefUpdate = doc(db, nameColl, querySnapshot.docs[0].id)
  await updateDoc(colRefUpdate, {
    quantity,
  })
}
