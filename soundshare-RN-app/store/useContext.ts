import { create } from "zustand"

interface ContextMenuState {
    isModalOpen: boolean
    setIsModalOpen: (isModalOpen: boolean) => void
}

const useContextStore = create<ContextMenuState>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set(() => ({ isModalOpen: !isModalOpen })),
}))

export { useContextStore }