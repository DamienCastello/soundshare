import { create } from "zustand"

interface ContextMenuState {
    signedUser: any
    setSignedUser: (signedUser: any) => void
    isModalOpen: boolean
    setIsModalOpen: (isModalOpen: boolean) => void
}

const useContextStore = create<ContextMenuState>()((set) => ({
  signedUser: {},
  setSignedUser: (signedUser) => set(() => ({ signedUser: signedUser})),
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set(() => ({ isModalOpen: !isModalOpen }))
}))

export { useContextStore }