import { Component, OnInit } from '@angular/core';
import { MetarService } from "../../app-core/service/metar.service";
import { Metar } from "../../app-core/models/metar";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
declare var $: any;
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-metar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-metar.html',
  styleUrl: './view-metar.scss'
})
export class ViewMetar implements OnInit {

  metars: Metar[] = [];
  form: FormGroup;
  loading: boolean = true;
  metarView: any;

  constructor(private metarService: MetarService,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      icao: ['', Validators.required],
      day: ['', Validators.required],
      hour: ['', Validators.required],
      wind: ['', Validators.required],
      infos: ['', Validators.required],
      temp: ['', Validators.required],
      dew_point: ['', Validators.required],
      qnh: ['', Validators.required],
      id: [0],
    });
  }

  ngOnInit(): void {
    this.listMetar()
  }

  listMetar() {
    this.loading = true;
    this.metarService.searchMetar()
      .then(reposta => {
        this.metars = reposta;
        this.loading = false;
      });
  }

  openModal() {
    $('#add-metar').modal('show');
  }

  closeModal() {
    $('#add-metar').modal('hide');
  }

  submitForm() {
    if (this.form.value.id > 0) {
      //VAMOS CHAMAR A FUNÇÃO DE EDITAR A TAREFA
      this.editMetar();
    } else {
      //VAMOS CHAMAR A FUNÇÃO DE SALVAR A TAREFA
      this.saveMetar();
    }
  }

  saveMetar() {
    if (this.form.valid) {
      const newMetar: Metar =
        new Metar(
          this.form.value.icao,
          this.form.value.day,
          this.form.value.hour,
          this.form.value.wind,
          this.form.value.infos,
          this.form.value.temp,
          this.form.value.dew_point,
          this.form.value.qnh,
          undefined);

      this.metarService.addMetar(newMetar)
        .then(reposta => {
          if (reposta > 0) {
            Swal.fire('Success!', 'Task saved successfully!', 'success');
            this.form.reset();
            this.closeModal();
            this.listMetar();
          }
        }).catch(respostaErro => {
          Swal.fire('Oops!', 'Could not save the task, please try again later.', 'error');
          console.log(respostaErro);
        });

    } else {
      console.log("INVALID FIELDS FOUND");
      Swal.fire("Attention!", "Some form fields are not correct.", 'warning');
      this.markAllClicked();
    }
  }

  editMetar() {
    if (this.form.valid) {
      const editMetar: Metar = new Metar(
        this.form.value.icao,
        this.form.value.day,
        this.form.value.hour,
        this.form.value.wind,
        this.form.value.infos,
        this.form.value.temp,
        this.form.value.dew_point,
        this.form.value.qnh,
        undefined
      );
      this.metarService.updateMetar(this.form.value.id, editMetar).then(
        reposta => {
          if (reposta === 1) {
            Swal.fire('Success!', 'Task edited successfully!', 'success');
            this.form.reset();
            this.closeModal();
            this.listMetar();
          } else {
            Swal.fire('Attention', 'No task found or no changes were made', 'info');
          }
        }).catch(error => {
          Swal.fire('Oops!', 'Could not edit the task', 'error');
        });
    } else {
      Swal.fire('Warning!', 'Some fields are incorrect!', 'warning');
      this.markAllClicked();
    }
  }

  markAllClicked() {
    Object.values(this.form.controls)
      .forEach(field => {
        field.markAsTouched();
      });
  }

  isfieldValid(inputName: string): boolean {
    const field: any = this.form.get(inputName);
    return field && field.touched && field.invalid;
  }

  setCurrentMetar(t: Metar) {
    this.metarView = t;
  }

  deleteMetar(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6'
    }).then(ButtonType => {
      if (ButtonType.isConfirmed) {
        this.metarService.removeMetar(id)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The task has been deleted successfully!',
              icon: 'success',
            });
            this.listMetar();
          })
      }
    }).catch(error => {
      console.log(error);
      Swal.fire('Oops!', 'The task was not deleted, please try again later. If the problem persists, contact support. ', 'warning');
    })
  }

  loadinDataMetar(metar: Metar) {
    this.form.patchValue({
      icao: metar.icao,
      day: metar.day,
      hour: metar.hour,
      wind: metar.wind,
      infos: metar.infos,
      temp: metar.temp,
      dew_point: metar.dew_point,
      qnh: metar.qnh,
      id: metar.id
    });
    this.openModal();
  }


}