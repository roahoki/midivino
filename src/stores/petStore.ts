import { defineStore } from 'pinia'

export const usePetStore = defineStore('petStore', {
    state: () => ({
        pets: [] as Array<{
            id: number
            name: string
            category: { id: number; name: string }
            photoUrls: string[]
            tags: { id: number; name: string }[]
            status: string
        }>,
    }),
    actions: {
        addPet(pet: {
            id: number
            name: string
            category: { id: number; name: string }
            photoUrls: string[]
            tags: { id: number; name: string }[]
            status: string
        }) {
            this.pets.push(pet)
        },
        fetchAndMergePets(apiPets: any) {
            const mergedPets = [...apiPets, ...this.pets]; // Cambiar el orden para mostrar primero los locales
            this.pets = mergedPets;
        },
        async initializePets() {
            try {
                const response = await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
                if (response.ok) {
                    const apiPets = await response.json()
                    this.pets = apiPets
                } else {
                    console.error('Error al inicializar las mascotas')
                }
            } catch (error) {
                console.error('Error al obtener las mascotas:', error)
            }
        },
        filterUniquePetsByName() {
            const uniquePets = new Map();
            this.pets.forEach(pet => {
                if (!uniquePets.has(pet.name)) {
                    uniquePets.set(pet.name, pet);
                }
            });
            this.pets = Array.from(uniquePets.values());
        },
        removePet(petId: number) {
            this.pets = this.pets.filter(pet => pet.id !== petId);
        },
    },
})