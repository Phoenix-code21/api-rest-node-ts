interface EntityBoundRepository {

    setEntity(entity: string): void;
    getEntity(): string;

}

export default EntityBoundRepository;