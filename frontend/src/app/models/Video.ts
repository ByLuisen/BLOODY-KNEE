export class Video {
    private id: number;
    private type_id: number;
    private modality_id: number;
    private title: string;
    private coach: string;
    private description: string;
    private url: string;
    private visits: number;
    private likes: number;
    private dislikes: number;
    private upload_date: Date;
    private duration: string;
    private exclusive: boolean;
  
    constructor(
      id: number = 0,
      type_id: number = 0,
      modality_id: number = 0,
      title: string = '',
      coach: string = '',
      description: string = '',
      url: string = '',
      visits: number = 0,
      likes: number = 0,
      dislikes: number = 0,
      upload_date: Date = new Date(),
      duration: string = '',
      exclusive: boolean = false
    ) {
      this.id = id;
      this.type_id = type_id;
      this.modality_id = modality_id;
      this.title = title;
      this.coach = coach;
      this.description = description;
      this.url = url;
      this.visits = visits;
      this.likes = likes;
      this.dislikes = dislikes;
      this.upload_date = upload_date;
      this.duration = duration;
      this.exclusive = exclusive;
    }
  
    // Getters
    getId(): number {
      return this.id;
    }
    getTypeId(): number {
      return this.type_id;
    }
    getModalityId(): number {
      return this.modality_id;
    }
    getTitle(): string {
      return this.title;
    }
    getCoach(): string {
      return this.coach;
    }
    getDescription(): string {
      return this.description;
    }
    getUrl(): string {
      return this.url;
    }
    getVisits(): number {
      return this.visits;
    }
    getLikes(): number {
      return this.likes;
    }
    getDislikes(): number {
      return this.dislikes;
    }
    getUploadDate(): Date {
      return this.upload_date;
    }
    getDuration(): string {
      return this.duration;
    }
    getExclusive(): boolean {
      return this.exclusive;
    }
  
    // Setters
    setId(id: number): void {
      this.id = id;
    }
    setTypeId(type_id: number): void {
      this.type_id = type_id;
    }
    setModalityId(modality_id: number): void {
      this.modality_id = modality_id;
    }
    setTitle(title: string): void {
      this.title = title;
    }
    setCoach(coach: string): void {
      this.coach = coach;
    }
    setDescription(description: string): void {
      this.description = description;
    }
    setUrl(url: string): void {
      this.url = url;
    }
    setVisits(visits: number): void {
      this.visits = visits;
    }
    setLikes(likes: number): void {
      this.likes = likes;
    }
    setDislikes(dislikes: number): void {
      this.dislikes = dislikes;
    }
    setUploadDate(upload_date: Date): void {
      this.upload_date = upload_date;
    }
    setDuration(duration: string): void {
      this.duration = duration;
    }
    setExclusive(exclusive: boolean): void {
      this.exclusive = exclusive;
    }
  
    // Convertir objeto a JSON
    toJSON(): any {
      return {
        id: this.id,
        type_id: this.type_id,
        modality_id: this.modality_id,
        title: this.title,
        coach: this.coach,
        description: this.description,
        url: this.url,
        visits: this.visits,
        likes: this.likes,
        dislikes: this.dislikes,
        upload_date: this.upload_date.toISOString(), // Convertir fecha a formato ISO
        duration: this.duration,
        exclusive: this.exclusive,
      };
    }
  }
  