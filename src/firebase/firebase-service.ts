import { db } from 'firebase'
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { OrderCustom, QueryCustom } from 'models'
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

export async function firebaseGetItemByOneCondition<T>(
  colRef: CollectionReference,
  conditions: QueryCustom[] | [],
  orderConditions: OrderCustom[] | []
): Promise<T[]> {
  let q = query(colRef)
  conditions.forEach((condition: QueryCustom) => {
    const { field, operand, value } = condition
    q = query(q, where(field, operand, value))
  })

  orderConditions.forEach((condition: OrderCustom) => {
    const { field, value } = condition
    q = query(q, orderBy(field, value))
  })

  try {
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as T),
      }
    })
    return data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
